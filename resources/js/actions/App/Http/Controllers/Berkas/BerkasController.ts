import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Berkas\BerkasController::index
* @see app/Http/Controllers/Berkas/BerkasController.php:52
* @route '/berkas/{tahun?}/{statusberkas}'
*/
export const index = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/berkas/{tahun?}/{statusberkas}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::index
* @see app/Http/Controllers/Berkas/BerkasController.php:52
* @route '/berkas/{tahun?}/{statusberkas}'
*/
index.url = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            tahun: args[0],
            statusberkas: args[1],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "tahun",
    ])

    const parsedArgs = {
        tahun: args.tahun,
        statusberkas: args.statusberkas,
    }

    return index.definition.url
            .replace('{tahun?}', parsedArgs.tahun?.toString() ?? '')
            .replace('{statusberkas}', parsedArgs.statusberkas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::index
* @see app/Http/Controllers/Berkas/BerkasController.php:52
* @route '/berkas/{tahun?}/{statusberkas}'
*/
index.get = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::index
* @see app/Http/Controllers/Berkas/BerkasController.php:52
* @route '/berkas/{tahun?}/{statusberkas}'
*/
index.head = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::index
* @see app/Http/Controllers/Berkas/BerkasController.php:52
* @route '/berkas/{tahun?}/{statusberkas}'
*/
const indexForm = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::index
* @see app/Http/Controllers/Berkas/BerkasController.php:52
* @route '/berkas/{tahun?}/{statusberkas}'
*/
indexForm.get = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::index
* @see app/Http/Controllers/Berkas/BerkasController.php:52
* @route '/berkas/{tahun?}/{statusberkas}'
*/
indexForm.head = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Berkas\BerkasController::addRiwayat
* @see app/Http/Controllers/Berkas/BerkasController.php:272
* @route '/add-riwayat/{berka}'
*/
export const addRiwayat = (args: { berka: string | number } | [berka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addRiwayat.url(args, options),
    method: 'post',
})

addRiwayat.definition = {
    methods: ["post"],
    url: '/add-riwayat/{berka}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::addRiwayat
* @see app/Http/Controllers/Berkas/BerkasController.php:272
* @route '/add-riwayat/{berka}'
*/
addRiwayat.url = (args: { berka: string | number } | [berka: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { berka: args }
    }

    if (Array.isArray(args)) {
        args = {
            berka: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        berka: args.berka,
    }

    return addRiwayat.definition.url
            .replace('{berka}', parsedArgs.berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::addRiwayat
* @see app/Http/Controllers/Berkas/BerkasController.php:272
* @route '/add-riwayat/{berka}'
*/
addRiwayat.post = (args: { berka: string | number } | [berka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addRiwayat.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::addRiwayat
* @see app/Http/Controllers/Berkas/BerkasController.php:272
* @route '/add-riwayat/{berka}'
*/
const addRiwayatForm = (args: { berka: string | number } | [berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addRiwayat.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::addRiwayat
* @see app/Http/Controllers/Berkas/BerkasController.php:272
* @route '/add-riwayat/{berka}'
*/
addRiwayatForm.post = (args: { berka: string | number } | [berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addRiwayat.url(args, options),
    method: 'post',
})

addRiwayat.form = addRiwayatForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getVerifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:747
* @route '/get-verifikator/{berka}'
*/
export const getVerifikator = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVerifikator.url(args, options),
    method: 'get',
})

getVerifikator.definition = {
    methods: ["get","head"],
    url: '/get-verifikator/{berka}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getVerifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:747
* @route '/get-verifikator/{berka}'
*/
getVerifikator.url = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getVerifikator.definition.url
            .replace('{berka}', parsedArgs.berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getVerifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:747
* @route '/get-verifikator/{berka}'
*/
getVerifikator.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVerifikator.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getVerifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:747
* @route '/get-verifikator/{berka}'
*/
getVerifikator.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getVerifikator.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getVerifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:747
* @route '/get-verifikator/{berka}'
*/
const getVerifikatorForm = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVerifikator.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getVerifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:747
* @route '/get-verifikator/{berka}'
*/
getVerifikatorForm.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVerifikator.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getVerifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:747
* @route '/get-verifikator/{berka}'
*/
getVerifikatorForm.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVerifikator.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getVerifikator.form = getVerifikatorForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getHistory
* @see app/Http/Controllers/Berkas/BerkasController.php:763
* @route '/get-history/{id}'
*/
export const getHistory = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHistory.url(args, options),
    method: 'get',
})

getHistory.definition = {
    methods: ["get","head"],
    url: '/get-history/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getHistory
* @see app/Http/Controllers/Berkas/BerkasController.php:763
* @route '/get-history/{id}'
*/
getHistory.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return getHistory.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getHistory
* @see app/Http/Controllers/Berkas/BerkasController.php:763
* @route '/get-history/{id}'
*/
getHistory.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHistory.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getHistory
* @see app/Http/Controllers/Berkas/BerkasController.php:763
* @route '/get-history/{id}'
*/
getHistory.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getHistory.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getHistory
* @see app/Http/Controllers/Berkas/BerkasController.php:763
* @route '/get-history/{id}'
*/
const getHistoryForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getHistory.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getHistory
* @see app/Http/Controllers/Berkas/BerkasController.php:763
* @route '/get-history/{id}'
*/
getHistoryForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getHistory.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getHistory
* @see app/Http/Controllers/Berkas/BerkasController.php:763
* @route '/get-history/{id}'
*/
getHistoryForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getHistory.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getHistory.form = getHistoryForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::storeBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:106
* @route '/store-berkas'
*/
export const storeBerkas = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBerkas.url(options),
    method: 'post',
})

storeBerkas.definition = {
    methods: ["post"],
    url: '/store-berkas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::storeBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:106
* @route '/store-berkas'
*/
storeBerkas.url = (options?: RouteQueryOptions) => {
    return storeBerkas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::storeBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:106
* @route '/store-berkas'
*/
storeBerkas.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBerkas.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::storeBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:106
* @route '/store-berkas'
*/
const storeBerkasForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeBerkas.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::storeBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:106
* @route '/store-berkas'
*/
storeBerkasForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeBerkas.url(options),
    method: 'post',
})

storeBerkas.form = storeBerkasForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::updateBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:188
* @route '/update-berkas/{berka}'
*/
export const updateBerkas = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateBerkas.url(args, options),
    method: 'put',
})

updateBerkas.definition = {
    methods: ["put"],
    url: '/update-berkas/{berka}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::updateBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:188
* @route '/update-berkas/{berka}'
*/
updateBerkas.url = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateBerkas.definition.url
            .replace('{berka}', parsedArgs.berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::updateBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:188
* @route '/update-berkas/{berka}'
*/
updateBerkas.put = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateBerkas.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::updateBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:188
* @route '/update-berkas/{berka}'
*/
const updateBerkasForm = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateBerkas.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::updateBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:188
* @route '/update-berkas/{berka}'
*/
updateBerkasForm.put = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateBerkas.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateBerkas.form = updateBerkasForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::destroyBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:240
* @route '/destroy-berkas/{berka}'
*/
export const destroyBerkas = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyBerkas.url(args, options),
    method: 'delete',
})

destroyBerkas.definition = {
    methods: ["delete"],
    url: '/destroy-berkas/{berka}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::destroyBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:240
* @route '/destroy-berkas/{berka}'
*/
destroyBerkas.url = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroyBerkas.definition.url
            .replace('{berka}', parsedArgs.berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::destroyBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:240
* @route '/destroy-berkas/{berka}'
*/
destroyBerkas.delete = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyBerkas.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::destroyBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:240
* @route '/destroy-berkas/{berka}'
*/
const destroyBerkasForm = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyBerkas.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::destroyBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:240
* @route '/destroy-berkas/{berka}'
*/
destroyBerkasForm.delete = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyBerkas.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyBerkas.form = destroyBerkasForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::editBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:783
* @route '/edit-berkas/{id}'
*/
export const editBerkas = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editBerkas.url(args, options),
    method: 'get',
})

editBerkas.definition = {
    methods: ["get","head"],
    url: '/edit-berkas/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::editBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:783
* @route '/edit-berkas/{id}'
*/
editBerkas.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return editBerkas.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::editBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:783
* @route '/edit-berkas/{id}'
*/
editBerkas.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::editBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:783
* @route '/edit-berkas/{id}'
*/
editBerkas.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editBerkas.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::editBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:783
* @route '/edit-berkas/{id}'
*/
const editBerkasForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::editBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:783
* @route '/edit-berkas/{id}'
*/
editBerkasForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::editBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:783
* @route '/edit-berkas/{id}'
*/
editBerkasForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editBerkas.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

editBerkas.form = editBerkasForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::findBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:849
* @route '/find-berkas/{id}'
*/
export const findBerkas = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: findBerkas.url(args, options),
    method: 'get',
})

findBerkas.definition = {
    methods: ["get","head"],
    url: '/find-berkas/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::findBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:849
* @route '/find-berkas/{id}'
*/
findBerkas.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return findBerkas.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::findBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:849
* @route '/find-berkas/{id}'
*/
findBerkas.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: findBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::findBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:849
* @route '/find-berkas/{id}'
*/
findBerkas.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: findBerkas.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::findBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:849
* @route '/find-berkas/{id}'
*/
const findBerkasForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: findBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::findBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:849
* @route '/find-berkas/{id}'
*/
findBerkasForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: findBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::findBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:849
* @route '/find-berkas/{id}'
*/
findBerkasForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: findBerkas.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

findBerkas.form = findBerkasForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detailBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:813
* @route '/detail-berkas/{id}'
*/
export const detailBerkas = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detailBerkas.url(args, options),
    method: 'get',
})

detailBerkas.definition = {
    methods: ["get","head"],
    url: '/detail-berkas/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detailBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:813
* @route '/detail-berkas/{id}'
*/
detailBerkas.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return detailBerkas.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detailBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:813
* @route '/detail-berkas/{id}'
*/
detailBerkas.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detailBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detailBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:813
* @route '/detail-berkas/{id}'
*/
detailBerkas.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detailBerkas.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detailBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:813
* @route '/detail-berkas/{id}'
*/
const detailBerkasForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: detailBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detailBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:813
* @route '/detail-berkas/{id}'
*/
detailBerkasForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: detailBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detailBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:813
* @route '/detail-berkas/{id}'
*/
detailBerkasForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: detailBerkas.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

detailBerkas.form = detailBerkasForm

const BerkasController = { index, addRiwayat, getVerifikator, getHistory, storeBerkas, updateBerkas, destroyBerkas, editBerkas, findBerkas, detailBerkas }

export default BerkasController