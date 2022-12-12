import { DataProvider, GetListParams } from "ra-core";
import { SupabaseClient } from "@supabase/supabase-js";
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
    console.debug();

    const { data, error } = await client
      .from(resourceOptions.table)
      .select(resourceOptions.fields.join(", "))
      .match(resourceOptions.table === "users" ? ({ telegram_id: id }) : ({ id }))
      .single();

    if (error) {
      throw error;
    }

    if (resourceOptions.primaryKey === "id" || resourceOptions.primaryKey === "telegram_id") {
      return { data };
    }

    return { ...data, id: data[resourceOptions.primaryKey] };
  },
  getMany: async (resource, { ids }) => {
    const resourceOptions = getResourceOptions(resource, resources);
    const { data, error } = await client
      .from(resourceOptions.table)
      .select(resourceOptions.fields.join(", "))
      .in(resourceOptions.table === "users" ? "telegram_id" : "id", ids);

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
  let query = client
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
};

const getResourceOptions = (
  resource: string,
  options: ResourcesOptions
): InternalResourceOptions => {
  const resourceOptions = options[resource];

  if (Array.isArray(resourceOptions)) {
    return {
      table: resource,
      primaryKey: resource === "users" ? "telegram_id" : "id",
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
