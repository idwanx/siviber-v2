import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::index
* @see app/Http/Controllers/DataPendukung/InstansiController.php:23
* @route '/data-pendukung/instansi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/data-pendukung/instansi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::index
* @see app/Http/Controllers/DataPendukung/InstansiController.php:23
* @route '/data-pendukung/instansi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::index
* @see app/Http/Controllers/DataPendukung/InstansiController.php:23
* @route '/data-pendukung/instansi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::index
* @see app/Http/Controllers/DataPendukung/InstansiController.php:23
* @route '/data-pendukung/instansi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::index
* @see app/Http/Controllers/DataPendukung/InstansiController.php:23
* @route '/data-pendukung/instansi'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::index
* @see app/Http/Controllers/DataPendukung/InstansiController.php:23
* @route '/data-pendukung/instansi'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::index
* @see app/Http/Controllers/DataPendukung/InstansiController.php:23
* @route '/data-pendukung/instansi'
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
* @see \App\Http\Controllers\DataPendukung\InstansiController::store
* @see app/Http/Controllers/DataPendukung/InstansiController.php:47
* @route '/data-pendukung/instansi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/data-pendukung/instansi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::store
* @see app/Http/Controllers/DataPendukung/InstansiController.php:47
* @route '/data-pendukung/instansi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::store
* @see app/Http/Controllers/DataPendukung/InstansiController.php:47
* @route '/data-pendukung/instansi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::store
* @see app/Http/Controllers/DataPendukung/InstansiController.php:47
* @route '/data-pendukung/instansi'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::store
* @see app/Http/Controllers/DataPendukung/InstansiController.php:47
* @route '/data-pendukung/instansi'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::update
* @see app/Http/Controllers/DataPendukung/InstansiController.php:87
* @route '/data-pendukung/instansi/{instansi}'
*/
export const update = (args: { instansi: string | { slug: string } } | [instansi: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/data-pendukung/instansi/{instansi}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::update
* @see app/Http/Controllers/DataPendukung/InstansiController.php:87
* @route '/data-pendukung/instansi/{instansi}'
*/
update.url = (args: { instansi: string | { slug: string } } | [instansi: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { instansi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { instansi: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            instansi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        instansi: typeof args.instansi === 'object'
        ? args.instansi.slug
        : args.instansi,
    }

    return update.definition.url
            .replace('{instansi}', parsedArgs.instansi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::update
* @see app/Http/Controllers/DataPendukung/InstansiController.php:87
* @route '/data-pendukung/instansi/{instansi}'
*/
update.put = (args: { instansi: string | { slug: string } } | [instansi: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::update
* @see app/Http/Controllers/DataPendukung/InstansiController.php:87
* @route '/data-pendukung/instansi/{instansi}'
*/
update.patch = (args: { instansi: string | { slug: string } } | [instansi: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::update
* @see app/Http/Controllers/DataPendukung/InstansiController.php:87
* @route '/data-pendukung/instansi/{instansi}'
*/
const updateForm = (args: { instansi: string | { slug: string } } | [instansi: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::update
* @see app/Http/Controllers/DataPendukung/InstansiController.php:87
* @route '/data-pendukung/instansi/{instansi}'
*/
updateForm.put = (args: { instansi: string | { slug: string } } | [instansi: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::update
* @see app/Http/Controllers/DataPendukung/InstansiController.php:87
* @route '/data-pendukung/instansi/{instansi}'
*/
updateForm.patch = (args: { instansi: string | { slug: string } } | [instansi: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DataPendukung\InstansiController::destroy
* @see app/Http/Controllers/DataPendukung/InstansiController.php:111
* @route '/data-pendukung/instansi/{instansi}'
*/
export const destroy = (args: { instansi: string | { slug: string } } | [instansi: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/data-pendukung/instansi/{instansi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::destroy
* @see app/Http/Controllers/DataPendukung/InstansiController.php:111
* @route '/data-pendukung/instansi/{instansi}'
*/
destroy.url = (args: { instansi: string | { slug: string } } | [instansi: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { instansi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { instansi: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            instansi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        instansi: typeof args.instansi === 'object'
        ? args.instansi.slug
        : args.instansi,
    }

    return destroy.definition.url
            .replace('{instansi}', parsedArgs.instansi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::destroy
* @see app/Http/Controllers/DataPendukung/InstansiController.php:111
* @route '/data-pendukung/instansi/{instansi}'
*/
destroy.delete = (args: { instansi: string | { slug: string } } | [instansi: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::destroy
* @see app/Http/Controllers/DataPendukung/InstansiController.php:111
* @route '/data-pendukung/instansi/{instansi}'
*/
const destroyForm = (args: { instansi: string | { slug: string } } | [instansi: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DataPendukung\InstansiController::destroy
* @see app/Http/Controllers/DataPendukung/InstansiController.php:111
* @route '/data-pendukung/instansi/{instansi}'
*/
destroyForm.delete = (args: { instansi: string | { slug: string } } | [instansi: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const instansi = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default instansi