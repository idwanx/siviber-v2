import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::getDataPendkungRegis
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:30
* @route '/fetch/data-pendukung-regis'
*/
export const getDataPendkungRegis = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDataPendkungRegis.url(options),
    method: 'get',
})

getDataPendkungRegis.definition = {
    methods: ["get","head"],
    url: '/fetch/data-pendukung-regis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::getDataPendkungRegis
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:30
* @route '/fetch/data-pendukung-regis'
*/
getDataPendkungRegis.url = (options?: RouteQueryOptions) => {
    return getDataPendkungRegis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::getDataPendkungRegis
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:30
* @route '/fetch/data-pendukung-regis'
*/
getDataPendkungRegis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDataPendkungRegis.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::getDataPendkungRegis
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:30
* @route '/fetch/data-pendukung-regis'
*/
getDataPendkungRegis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDataPendkungRegis.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::getDataPendkungRegis
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:30
* @route '/fetch/data-pendukung-regis'
*/
const getDataPendkungRegisForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getDataPendkungRegis.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::getDataPendkungRegis
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:30
* @route '/fetch/data-pendukung-regis'
*/
getDataPendkungRegisForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getDataPendkungRegis.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::getDataPendkungRegis
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:30
* @route '/fetch/data-pendukung-regis'
*/
getDataPendkungRegisForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getDataPendkungRegis.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getDataPendkungRegis.form = getDataPendkungRegisForm

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::getJenisBelanja
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:21
* @route '/fetch/jenis-belanja'
*/
export const getJenisBelanja = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getJenisBelanja.url(options),
    method: 'get',
})

getJenisBelanja.definition = {
    methods: ["get","head"],
    url: '/fetch/jenis-belanja',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::getJenisBelanja
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:21
* @route '/fetch/jenis-belanja'
*/
getJenisBelanja.url = (options?: RouteQueryOptions) => {
    return getJenisBelanja.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::getJenisBelanja
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:21
* @route '/fetch/jenis-belanja'
*/
getJenisBelanja.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getJenisBelanja.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::getJenisBelanja
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:21
* @route '/fetch/jenis-belanja'
*/
getJenisBelanja.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getJenisBelanja.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::getJenisBelanja
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:21
* @route '/fetch/jenis-belanja'
*/
const getJenisBelanjaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getJenisBelanja.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::getJenisBelanja
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:21
* @route '/fetch/jenis-belanja'
*/
getJenisBelanjaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getJenisBelanja.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::getJenisBelanja
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:21
* @route '/fetch/jenis-belanja'
*/
getJenisBelanjaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getJenisBelanja.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getJenisBelanja.form = getJenisBelanjaForm

const FetchDataController = { getDataPendkungRegis, getJenisBelanja }

export default FetchDataController