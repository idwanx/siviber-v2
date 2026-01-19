import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Berkas\BerkasController::index
* @see app/Http/Controllers/Berkas/BerkasController.php:42
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
* @see app/Http/Controllers/Berkas/BerkasController.php:42
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
* @see app/Http/Controllers/Berkas/BerkasController.php:42
* @route '/berkas/{tahun?}/{statusberkas}'
*/
index.get = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::index
* @see app/Http/Controllers/Berkas/BerkasController.php:42
* @route '/berkas/{tahun?}/{statusberkas}'
*/
index.head = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::index
* @see app/Http/Controllers/Berkas/BerkasController.php:42
* @route '/berkas/{tahun?}/{statusberkas}'
*/
const indexForm = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::index
* @see app/Http/Controllers/Berkas/BerkasController.php:42
* @route '/berkas/{tahun?}/{statusberkas}'
*/
indexForm.get = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::index
* @see app/Http/Controllers/Berkas/BerkasController.php:42
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
* @see app/Http/Controllers/Berkas/BerkasController.php:263
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
* @see app/Http/Controllers/Berkas/BerkasController.php:263
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
* @see app/Http/Controllers/Berkas/BerkasController.php:263
* @route '/add-riwayat/{berka}'
*/
addRiwayat.post = (args: { berka: string | number } | [berka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addRiwayat.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::addRiwayat
* @see app/Http/Controllers/Berkas/BerkasController.php:263
* @route '/add-riwayat/{berka}'
*/
const addRiwayatForm = (args: { berka: string | number } | [berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addRiwayat.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::addRiwayat
* @see app/Http/Controllers/Berkas/BerkasController.php:263
* @route '/add-riwayat/{berka}'
*/
addRiwayatForm.post = (args: { berka: string | number } | [berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addRiwayat.url(args, options),
    method: 'post',
})

addRiwayat.form = addRiwayatForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getVerifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:738
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
* @see app/Http/Controllers/Berkas/BerkasController.php:738
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
* @see app/Http/Controllers/Berkas/BerkasController.php:738
* @route '/get-verifikator/{berka}'
*/
getVerifikator.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVerifikator.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getVerifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:738
* @route '/get-verifikator/{berka}'
*/
getVerifikator.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getVerifikator.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getVerifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:738
* @route '/get-verifikator/{berka}'
*/
const getVerifikatorForm = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVerifikator.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getVerifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:738
* @route '/get-verifikator/{berka}'
*/
getVerifikatorForm.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVerifikator.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getVerifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:738
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
* @see app/Http/Controllers/Berkas/BerkasController.php:754
* @route '/get-history/{berka}'
*/
export const getHistory = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHistory.url(args, options),
    method: 'get',
})

getHistory.definition = {
    methods: ["get","head"],
    url: '/get-history/{berka}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getHistory
* @see app/Http/Controllers/Berkas/BerkasController.php:754
* @route '/get-history/{berka}'
*/
getHistory.url = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getHistory.definition.url
            .replace('{berka}', parsedArgs.berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getHistory
* @see app/Http/Controllers/Berkas/BerkasController.php:754
* @route '/get-history/{berka}'
*/
getHistory.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHistory.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getHistory
* @see app/Http/Controllers/Berkas/BerkasController.php:754
* @route '/get-history/{berka}'
*/
getHistory.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getHistory.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getHistory
* @see app/Http/Controllers/Berkas/BerkasController.php:754
* @route '/get-history/{berka}'
*/
const getHistoryForm = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getHistory.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getHistory
* @see app/Http/Controllers/Berkas/BerkasController.php:754
* @route '/get-history/{berka}'
*/
getHistoryForm.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getHistory.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getHistory
* @see app/Http/Controllers/Berkas/BerkasController.php:754
* @route '/get-history/{berka}'
*/
getHistoryForm.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see app/Http/Controllers/Berkas/BerkasController.php:97
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
* @see app/Http/Controllers/Berkas/BerkasController.php:97
* @route '/store-berkas'
*/
storeBerkas.url = (options?: RouteQueryOptions) => {
    return storeBerkas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::storeBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:97
* @route '/store-berkas'
*/
storeBerkas.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBerkas.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::storeBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:97
* @route '/store-berkas'
*/
const storeBerkasForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeBerkas.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::storeBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:97
* @route '/store-berkas'
*/
storeBerkasForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeBerkas.url(options),
    method: 'post',
})

storeBerkas.form = storeBerkasForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::updateBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:179
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
* @see app/Http/Controllers/Berkas/BerkasController.php:179
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
* @see app/Http/Controllers/Berkas/BerkasController.php:179
* @route '/update-berkas/{berka}'
*/
updateBerkas.put = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateBerkas.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::updateBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:179
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
* @see app/Http/Controllers/Berkas/BerkasController.php:179
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
* @see app/Http/Controllers/Berkas/BerkasController.php:231
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
* @see app/Http/Controllers/Berkas/BerkasController.php:231
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
* @see app/Http/Controllers/Berkas/BerkasController.php:231
* @route '/destroy-berkas/{berka}'
*/
destroyBerkas.delete = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyBerkas.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::destroyBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:231
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
* @see app/Http/Controllers/Berkas/BerkasController.php:231
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
* @see app/Http/Controllers/Berkas/BerkasController.php:770
* @route '/edit-berkas/{berka}'
*/
export const editBerkas = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editBerkas.url(args, options),
    method: 'get',
})

editBerkas.definition = {
    methods: ["get","head"],
    url: '/edit-berkas/{berka}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::editBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:770
* @route '/edit-berkas/{berka}'
*/
editBerkas.url = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return editBerkas.definition.url
            .replace('{berka}', parsedArgs.berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::editBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:770
* @route '/edit-berkas/{berka}'
*/
editBerkas.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::editBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:770
* @route '/edit-berkas/{berka}'
*/
editBerkas.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editBerkas.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::editBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:770
* @route '/edit-berkas/{berka}'
*/
const editBerkasForm = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::editBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:770
* @route '/edit-berkas/{berka}'
*/
editBerkasForm.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::editBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:770
* @route '/edit-berkas/{berka}'
*/
editBerkasForm.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see app/Http/Controllers/Berkas/BerkasController.php:803
* @route '/find-berkas/{berka}'
*/
export const findBerkas = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: findBerkas.url(args, options),
    method: 'get',
})

findBerkas.definition = {
    methods: ["get","head"],
    url: '/find-berkas/{berka}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::findBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:803
* @route '/find-berkas/{berka}'
*/
findBerkas.url = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return findBerkas.definition.url
            .replace('{berka}', parsedArgs.berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::findBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:803
* @route '/find-berkas/{berka}'
*/
findBerkas.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: findBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::findBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:803
* @route '/find-berkas/{berka}'
*/
findBerkas.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: findBerkas.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::findBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:803
* @route '/find-berkas/{berka}'
*/
const findBerkasForm = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: findBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::findBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:803
* @route '/find-berkas/{berka}'
*/
findBerkasForm.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: findBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::findBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:803
* @route '/find-berkas/{berka}'
*/
findBerkasForm.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see app/Http/Controllers/Berkas/BerkasController.php:786
* @route '/detail-berkas/{berka}'
*/
export const detailBerkas = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detailBerkas.url(args, options),
    method: 'get',
})

detailBerkas.definition = {
    methods: ["get","head"],
    url: '/detail-berkas/{berka}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detailBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:786
* @route '/detail-berkas/{berka}'
*/
detailBerkas.url = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return detailBerkas.definition.url
            .replace('{berka}', parsedArgs.berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detailBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:786
* @route '/detail-berkas/{berka}'
*/
detailBerkas.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detailBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detailBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:786
* @route '/detail-berkas/{berka}'
*/
detailBerkas.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detailBerkas.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detailBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:786
* @route '/detail-berkas/{berka}'
*/
const detailBerkasForm = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: detailBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detailBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:786
* @route '/detail-berkas/{berka}'
*/
detailBerkasForm.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: detailBerkas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detailBerkas
* @see app/Http/Controllers/Berkas/BerkasController.php:786
* @route '/detail-berkas/{berka}'
*/
detailBerkasForm.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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