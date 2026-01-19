import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Berkas\CatatansController::index
* @see app/Http/Controllers/Berkas/CatatansController.php:18
* @route '/catatan/{berka}'
*/
export const index = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/catatan/{berka}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\CatatansController::index
* @see app/Http/Controllers/Berkas/CatatansController.php:18
* @route '/catatan/{berka}'
*/
index.url = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { berka: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { berka: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            berka: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        berka: typeof args.berka === 'object'
        ? args.berka.id
        : args.berka,
    }

    return index.definition.url
            .replace('{berka}', parsedArgs.berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\CatatansController::index
* @see app/Http/Controllers/Berkas/CatatansController.php:18
* @route '/catatan/{berka}'
*/
index.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\CatatansController::index
* @see app/Http/Controllers/Berkas/CatatansController.php:18
* @route '/catatan/{berka}'
*/
index.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\CatatansController::index
* @see app/Http/Controllers/Berkas/CatatansController.php:18
* @route '/catatan/{berka}'
*/
const indexForm = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\CatatansController::index
* @see app/Http/Controllers/Berkas/CatatansController.php:18
* @route '/catatan/{berka}'
*/
indexForm.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\CatatansController::index
* @see app/Http/Controllers/Berkas/CatatansController.php:18
* @route '/catatan/{berka}'
*/
indexForm.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Berkas\CatatansController::store
* @see app/Http/Controllers/Berkas/CatatansController.php:28
* @route '/catatan/store'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/catatan/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Berkas\CatatansController::store
* @see app/Http/Controllers/Berkas/CatatansController.php:28
* @route '/catatan/store'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\CatatansController::store
* @see app/Http/Controllers/Berkas/CatatansController.php:28
* @route '/catatan/store'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\CatatansController::store
* @see app/Http/Controllers/Berkas/CatatansController.php:28
* @route '/catatan/store'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\CatatansController::store
* @see app/Http/Controllers/Berkas/CatatansController.php:28
* @route '/catatan/store'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Berkas\CatatansController::update
* @see app/Http/Controllers/Berkas/CatatansController.php:78
* @route '/catatan/update/{catatan_berka}'
*/
export const update = (args: { catatan_berka: string | number } | [catatan_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/catatan/update/{catatan_berka}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Berkas\CatatansController::update
* @see app/Http/Controllers/Berkas/CatatansController.php:78
* @route '/catatan/update/{catatan_berka}'
*/
update.url = (args: { catatan_berka: string | number } | [catatan_berka: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { catatan_berka: args }
    }

    if (Array.isArray(args)) {
        args = {
            catatan_berka: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        catatan_berka: args.catatan_berka,
    }

    return update.definition.url
            .replace('{catatan_berka}', parsedArgs.catatan_berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\CatatansController::update
* @see app/Http/Controllers/Berkas/CatatansController.php:78
* @route '/catatan/update/{catatan_berka}'
*/
update.put = (args: { catatan_berka: string | number } | [catatan_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Berkas\CatatansController::update
* @see app/Http/Controllers/Berkas/CatatansController.php:78
* @route '/catatan/update/{catatan_berka}'
*/
const updateForm = (args: { catatan_berka: string | number } | [catatan_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\CatatansController::update
* @see app/Http/Controllers/Berkas/CatatansController.php:78
* @route '/catatan/update/{catatan_berka}'
*/
updateForm.put = (args: { catatan_berka: string | number } | [catatan_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Berkas\CatatansController::updateChecked
* @see app/Http/Controllers/Berkas/CatatansController.php:117
* @route '/catatan/update-checked'
*/
export const updateChecked = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateChecked.url(options),
    method: 'post',
})

updateChecked.definition = {
    methods: ["post"],
    url: '/catatan/update-checked',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Berkas\CatatansController::updateChecked
* @see app/Http/Controllers/Berkas/CatatansController.php:117
* @route '/catatan/update-checked'
*/
updateChecked.url = (options?: RouteQueryOptions) => {
    return updateChecked.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\CatatansController::updateChecked
* @see app/Http/Controllers/Berkas/CatatansController.php:117
* @route '/catatan/update-checked'
*/
updateChecked.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateChecked.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\CatatansController::updateChecked
* @see app/Http/Controllers/Berkas/CatatansController.php:117
* @route '/catatan/update-checked'
*/
const updateCheckedForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateChecked.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\CatatansController::updateChecked
* @see app/Http/Controllers/Berkas/CatatansController.php:117
* @route '/catatan/update-checked'
*/
updateCheckedForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateChecked.url(options),
    method: 'post',
})

updateChecked.form = updateCheckedForm

/**
* @see \App\Http\Controllers\Berkas\CatatansController::destroy
* @see app/Http/Controllers/Berkas/CatatansController.php:153
* @route '/catatan/destroy/{catatan_berka}'
*/
export const destroy = (args: { catatan_berka: string | number } | [catatan_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/catatan/destroy/{catatan_berka}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Berkas\CatatansController::destroy
* @see app/Http/Controllers/Berkas/CatatansController.php:153
* @route '/catatan/destroy/{catatan_berka}'
*/
destroy.url = (args: { catatan_berka: string | number } | [catatan_berka: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { catatan_berka: args }
    }

    if (Array.isArray(args)) {
        args = {
            catatan_berka: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        catatan_berka: args.catatan_berka,
    }

    return destroy.definition.url
            .replace('{catatan_berka}', parsedArgs.catatan_berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\CatatansController::destroy
* @see app/Http/Controllers/Berkas/CatatansController.php:153
* @route '/catatan/destroy/{catatan_berka}'
*/
destroy.delete = (args: { catatan_berka: string | number } | [catatan_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Berkas\CatatansController::destroy
* @see app/Http/Controllers/Berkas/CatatansController.php:153
* @route '/catatan/destroy/{catatan_berka}'
*/
const destroyForm = (args: { catatan_berka: string | number } | [catatan_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\CatatansController::destroy
* @see app/Http/Controllers/Berkas/CatatansController.php:153
* @route '/catatan/destroy/{catatan_berka}'
*/
destroyForm.delete = (args: { catatan_berka: string | number } | [catatan_berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const CatatansController = { index, store, update, updateChecked, destroy }

export default CatatansController