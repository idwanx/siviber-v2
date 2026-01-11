import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::datapendukungregis
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:30
* @route '/fetch/data-pendukung-regis'
*/
export const datapendukungregis = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: datapendukungregis.url(options),
    method: 'get',
})

datapendukungregis.definition = {
    methods: ["get","head"],
    url: '/fetch/data-pendukung-regis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::datapendukungregis
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:30
* @route '/fetch/data-pendukung-regis'
*/
datapendukungregis.url = (options?: RouteQueryOptions) => {
    return datapendukungregis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::datapendukungregis
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:30
* @route '/fetch/data-pendukung-regis'
*/
datapendukungregis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: datapendukungregis.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::datapendukungregis
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:30
* @route '/fetch/data-pendukung-regis'
*/
datapendukungregis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: datapendukungregis.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::datapendukungregis
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:30
* @route '/fetch/data-pendukung-regis'
*/
const datapendukungregisForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: datapendukungregis.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::datapendukungregis
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:30
* @route '/fetch/data-pendukung-regis'
*/
datapendukungregisForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: datapendukungregis.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::datapendukungregis
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:30
* @route '/fetch/data-pendukung-regis'
*/
datapendukungregisForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: datapendukungregis.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

datapendukungregis.form = datapendukungregisForm

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::jenisbelanja
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:21
* @route '/fetch/jenis-belanja'
*/
export const jenisbelanja = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: jenisbelanja.url(options),
    method: 'get',
})

jenisbelanja.definition = {
    methods: ["get","head"],
    url: '/fetch/jenis-belanja',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::jenisbelanja
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:21
* @route '/fetch/jenis-belanja'
*/
jenisbelanja.url = (options?: RouteQueryOptions) => {
    return jenisbelanja.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::jenisbelanja
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:21
* @route '/fetch/jenis-belanja'
*/
jenisbelanja.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: jenisbelanja.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::jenisbelanja
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:21
* @route '/fetch/jenis-belanja'
*/
jenisbelanja.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: jenisbelanja.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::jenisbelanja
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:21
* @route '/fetch/jenis-belanja'
*/
const jenisbelanjaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: jenisbelanja.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::jenisbelanja
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:21
* @route '/fetch/jenis-belanja'
*/
jenisbelanjaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: jenisbelanja.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\FetchDataController::jenisbelanja
* @see app/Http/Controllers/DataPendukung/FetchDataController.php:21
* @route '/fetch/jenis-belanja'
*/
jenisbelanjaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: jenisbelanja.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

jenisbelanja.form = jenisbelanjaForm

const fetch = {
    datapendukungregis: Object.assign(datapendukungregis, datapendukungregis),
    jenisbelanja: Object.assign(jenisbelanja, jenisbelanja),
}

export default fetch