import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::index
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:19
* @route '/data-pendukung/jenis-berkas'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/data-pendukung/jenis-berkas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::index
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:19
* @route '/data-pendukung/jenis-berkas'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::index
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:19
* @route '/data-pendukung/jenis-berkas'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::index
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:19
* @route '/data-pendukung/jenis-berkas'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::index
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:19
* @route '/data-pendukung/jenis-berkas'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::index
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:19
* @route '/data-pendukung/jenis-berkas'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::index
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:19
* @route '/data-pendukung/jenis-berkas'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::store
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:39
* @route '/data-pendukung/jenis-berkas'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/data-pendukung/jenis-berkas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::store
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:39
* @route '/data-pendukung/jenis-berkas'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::store
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:39
* @route '/data-pendukung/jenis-berkas'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::store
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:39
* @route '/data-pendukung/jenis-berkas'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::store
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:39
* @route '/data-pendukung/jenis-berkas'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::update
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:79
* @route '/data-pendukung/jenis-berkas/{jenis_berka}'
*/
export const update = (args: { jenis_berka: string | number } | [jenis_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/data-pendukung/jenis-berkas/{jenis_berka}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::update
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:79
* @route '/data-pendukung/jenis-berkas/{jenis_berka}'
*/
update.url = (args: { jenis_berka: string | number } | [jenis_berka: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenis_berka: args }
    }

    if (Array.isArray(args)) {
        args = {
            jenis_berka: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenis_berka: args.jenis_berka,
    }

    return update.definition.url
            .replace('{jenis_berka}', parsedArgs.jenis_berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::update
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:79
* @route '/data-pendukung/jenis-berkas/{jenis_berka}'
*/
update.put = (args: { jenis_berka: string | number } | [jenis_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::update
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:79
* @route '/data-pendukung/jenis-berkas/{jenis_berka}'
*/
update.patch = (args: { jenis_berka: string | number } | [jenis_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::update
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:79
* @route '/data-pendukung/jenis-berkas/{jenis_berka}'
*/
const updateForm = (args: { jenis_berka: string | number } | [jenis_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::update
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:79
* @route '/data-pendukung/jenis-berkas/{jenis_berka}'
*/
updateForm.put = (args: { jenis_berka: string | number } | [jenis_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::update
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:79
* @route '/data-pendukung/jenis-berkas/{jenis_berka}'
*/
updateForm.patch = (args: { jenis_berka: string | number } | [jenis_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::destroy
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:103
* @route '/data-pendukung/jenis-berkas/{jenis_berka}'
*/
export const destroy = (args: { jenis_berka: string | number } | [jenis_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/data-pendukung/jenis-berkas/{jenis_berka}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::destroy
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:103
* @route '/data-pendukung/jenis-berkas/{jenis_berka}'
*/
destroy.url = (args: { jenis_berka: string | number } | [jenis_berka: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenis_berka: args }
    }

    if (Array.isArray(args)) {
        args = {
            jenis_berka: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenis_berka: args.jenis_berka,
    }

    return destroy.definition.url
            .replace('{jenis_berka}', parsedArgs.jenis_berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::destroy
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:103
* @route '/data-pendukung/jenis-berkas/{jenis_berka}'
*/
destroy.delete = (args: { jenis_berka: string | number } | [jenis_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::destroy
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:103
* @route '/data-pendukung/jenis-berkas/{jenis_berka}'
*/
const destroyForm = (args: { jenis_berka: string | number } | [jenis_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DataPendukung\JenisBerkasController::destroy
* @see app/Http/Controllers/DataPendukung/JenisBerkasController.php:103
* @route '/data-pendukung/jenis-berkas/{jenis_berka}'
*/
destroyForm.delete = (args: { jenis_berka: string | number } | [jenis_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const JenisBerkasController = { index, store, update, destroy }

export default JenisBerkasController