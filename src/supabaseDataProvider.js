import { DataProvider, GetListParams } from "ra-core";
import { SupabaseClient } from "@supabase/supabase-js";
import { report_type } from './enums';
export const supabaseDataProvider = (
  client: SupabaseClient,
  resources: ResourcesOptions
): DataProvider => ({
  getList: async (resource, params) => {

    const resourceOptions = getResourceOptions(resource, resources);
    return getList({ client, resource, resourceOptions, params });
  },
  getOne: async (resource, { id }) => {
    const resourceOptions = getResourceOptions(resource, resources);
    if (resource === "reports") {
      const { data: reportData, error } = await client
        .from(resourceOptions.table)
        .select(resourceOptions.fields.join(", "))
        .match({ "channel_id": id })
      const data = reports.changeReportSchema(reportData);
      if (error) {
        throw error;
      }

      return { data: data[0] };
    } else {

      const { data, error } = await client
        .from(resourceOptions.table)
        .select(resourceOptions.fields.join(", "))
        .match({ [resourceOptions.primaryKey]: id })
        .single();

      if (error) {
        throw error;
      }

      if (resourceOptions.primaryKey === "id") {
        return { data };
      }

      return { ...data, id: data[resourceOptions.primaryKey] };
    }
  },
  getMany: async (resource, { ids }) => {
    const resourceOptions = getResourceOptions(resource, resources);
    const { data, error } = await client
      .from(resourceOptions.table)
      .select(resourceOptions.fields.join(", "))
      .in(resourceOptions.primaryKey, ids);

    if (error) {
      throw error;
    }
    return { data: data ?? [] };
  },
  getManyReference: async (resource, originalParams) => {
    const resourceOptions = getResourceOptions(resource, resources);
    const { target, id } = originalParams;// sort.field = "id" error make primary key
    const params = {
      ...originalParams,
      filter: { ...originalParams.filter, [target]: id },
    };
    return getList({ client, resource, resourceOptions, params });
  },
  create: async (resource, { data }) => {
    const resourceOptions = getResourceOptions(resource, resources);
    const { data: record, error } = await client
      .from(resourceOptions.table)
      .insert(data)
      .single();

    if (error) {
      throw error;
    }

    if (resourceOptions.primaryKey === "id" || resourceOptions.primaryKey === "telegram_id") {
      return { data: record };
    }

    return { ...record, id: record[resourceOptions.primaryKey] };
  },
  update: async (resource, { id, data }) => {
    const resourceOptions = getResourceOptions(resource, resources);
    const { data: record, error } = await client
      .from(resourceOptions.table)
      .update(data)
      .match(resourceOptions.table === "users" ? ({ telegram_id: id }) : ({ id }))
      .single();

    if (error) {
      throw error;
    }

    if (resourceOptions.primaryKey === "id" || resourceOptions.primaryKey === "telegram_id") {
      return { data: record };
    }

    return { ...record, id: record[resourceOptions.primaryKey] };
  },
  updateMany: async (resource, { ids, data }) => {
    const resourceOptions = getResourceOptions(resource, resources);
    const { data: records, error } = await client
      .from(resourceOptions.table)
      .update(data)
      .in(resourceOptions.table === "users" ? "telegram_id" : "id", ids);

    if (error) {
      throw error;
    }
    return {
      data: records?.map((record) => record[resourceOptions.primaryKey]),
    };
  },
  delete: async (resource, { id }) => {
    const resourceOptions = getResourceOptions(resource, resources);
    const { data: record, error } = await client
      .from(resourceOptions.table)
      .delete()
      .match(resourceOptions.table === "users" ? ({ telegram_id: id }) : ({ id }))
      .single();

    if (error) {
      throw error;
    }

    if (resourceOptions.primaryKey === "id" || resourceOptions.primaryKey === "telegram_id") {
      return { data: record };
    }

    return { ...record, id: record[resourceOptions.primaryKey] };
  },
  deleteMany: async (resource, { ids }) => {
    const resourceOptions = getResourceOptions(resource, resources);
    const { data: records, error } = await client
      .from(resourceOptions.table)
      .delete()
      .in(resourceOptions.table === "users" ? "telegram_id" : "id", ids);

    if (error) {
      throw error;
    }
    return {
      data: records?.((record) => record[resourceOptions.primaryKey]),
    };
  },
});

type ResourceOptionsWithFullTextSearch = {
  table?: string;
  primaryKey?: string;
  fields: string[];
  fullTextSearchFields?: string[];
};

type InternalResourceOptions = Required<ResourceOptionsWithFullTextSearch>;

export type ResourceOptions = string[] | ResourceOptionsWithFullTextSearch;
export type ResourcesOptions = Record<string, ResourceOptions>;

const getList = async ({
  client,
  resource,
  resourceOptions,
  params,
}: {
  client: SupabaseClient;
  resource: string;
  resourceOptions: InternalResourceOptions;
  params: GetListParams;
}) => {
  const {
    pagination,
    sort,
    filter: { q, ...filter },
  } = params;
  const rangeFrom = (pagination.page - 1) * pagination.perPage;
  const rangeTo = rangeFrom + pagination.perPage;
  let query;
  if (resourceOptions.table === "reports") {
    query = client
      .from(resourceOptions.table)
      .select(resourceOptions.fields.join(", "), { count: "exact" })
      .match(filter)
      .range(rangeFrom, rangeTo);

    const { data: reportsData, error } = await query;
    const data = reports.changeReportSchema(reportsData);
    if (error) {
      throw error;
    }
    const res =
    {
      data: data,
      total: data.length || 0,
    };

    return res;
  } else {
    query = client
      .from(resourceOptions.table)
      .select(resourceOptions.fields.join(", "), { count: "exact" })
      .match(filter)
      .range(rangeFrom, rangeTo);

    if (q) {
      const fullTextSearchFields = Array.isArray(resourceOptions)
        ? resourceOptions
        : resourceOptions.fullTextSearchFields;

      fullTextSearchFields.forEach((field) => {
        query = query.ilike(field, `%${q}%`);
      });
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }
    const res =
    {
      data:
        resourceOptions.primaryKey === "id"
          ? data
          : data.map((item) => ({
            ...item,
            id: item[resourceOptions.primaryKey],
          })) ?? [],
      total: count ?? 0,
    };

    return res;
  }
};
const getResourceOptions = (
  resource: string,
  options: ResourcesOptions
): InternalResourceOptions => {
  const resourceOptions = options[resource];

  if (Array.isArray(resourceOptions)) {
    return {
      table: resource,
      primaryKey: "id",
      fields: resourceOptions,
      fullTextSearchFields: resourceOptions,
    };
  }

  return {
    table: resourceOptions.table ?? resource,
    primaryKey: resourceOptions.primaryKey ?? "id",
    fields: resourceOptions.fields,
    fullTextSearchFields:
      resourceOptions.fullTextSearchFields ?? resourceOptions.fields,
  };
};
export interface dataSchema {
  id: string,
  user_id: number | string,
  channel_id: number | string,
  report_type: report_type, // the type in enum.ts
  blob_url: null | string
}
export interface reportsAdminSchema {
  id: number | string,
  info: dataSchema[],
  channel_id: number | string,
  none_exists: 0,
  personal_link: 0,
  scam: 0,
  child_pornography: 0,
  drugs: 0,
  terrorist: 0,
  language_error: 0,
  spam: 0,
  theft: 0,
  occupy_screen: 0,
  ad_competitor: 0,
  disrupting_rankings: 0,
  pull_fans: 0,
  other: 0,
}

const reports = {
  changeReportSchema(data): reportsAdminSchema[] {
    if (!data) return [];
    const default_report_types = {
      none_exists: 0,
      personal_link: 0,
      scam: 0,
      child_pornography: 0,
      drugs: 0,
      terrorist: 0,
      language_error: 0,
      spam: 0,
      theft: 0,
      occupy_screen: 0,
      ad_competitor: 0,
      disrupting_rankings: 0,
      pull_fans: 0,
      other: 0,
    }
    const reports_object: { [key: string]: reportsAdminSchema } = data.reduce((obj, c) => {
      const user_report = { ...c };
      const info = obj[c.channel_id]?.info.push(user_report) || [user_report];
      const channel = {
        info,
        ...default_report_types,
        ...obj[c.channel_id],
        [c.report_type]: this[c.report_type] + 1 || 1,
      };
      obj[c.channel_id] = channel
      return obj;
    }, {});
    const reports_arr = Object.entries(reports_object).map(([channel_id, extra]) => ({ channel_id, ...extra, id: parseInt(channel_id) }));
    return reports_arr;
  },

  returnReportsToSchema(reports): dataSchema {
    const return_same_data = reports.reduce((arr, c) => {
      c.info.forEach(inf => {
        arr.push({ channel_id: c.channel_id, ...inf })
      });
      return arr
    }, [])
    return return_same_data;
  }
}