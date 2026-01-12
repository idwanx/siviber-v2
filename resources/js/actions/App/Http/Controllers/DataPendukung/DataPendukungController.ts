import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\DataPendukung\DataPendukungController::__invoke
* @see app/Http/Controllers/DataPendukung/DataPendukungController.php:21
* @route '/data-pendukung'
*/
const DataPendukungController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DataPendukungController.url(options),
    method: 'get',
})

DataPendukungController.definition = {
    methods: ["get","head"],
    url: '/data-pendukung',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataPendukung\DataPendukungController::__invoke
* @see app/Http/Controllers/DataPendukung/DataPendukungController.php:21
* @route '/data-pendukung'
*/
DataPendukungController.url = (options?: RouteQueryOptions) => {
    return DataPendukungController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataPendukung\DataPendukungController::__invoke
* @see app/Http/Controllers/DataPendukung/DataPendukungController.php:21
* @route '/data-pendukung'
*/
DataPendukungController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DataPendukungController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\DataPendukungController::__invoke
* @see app/Http/Controllers/DataPendukung/DataPendukungController.php:21
* @route '/data-pendukung'
*/
DataPendukungController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: DataPendukungController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DataPendukung\DataPendukungController::__invoke
* @see app/Http/Controllers/DataPendukung/DataPendukungController.php:21
* @route '/data-pendukung'
*/
const DataPendukungControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DataPendukungController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\DataPendukungController::__invoke
* @see app/Http/Controllers/DataPendukung/DataPendukungController.php:21
* @route '/data-pendukung'
*/
DataPendukungControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DataPendukungController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\DataPendukungController::__invoke
* @see app/Http/Controllers/DataPendukung/DataPendukungController.php:21
* @route '/data-pendukung'
*/
DataPendukungControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DataPendukungController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

DataPendukungController.form = DataPendukungControllerForm

export default DataPendukungController