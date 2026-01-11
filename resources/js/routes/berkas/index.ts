import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Berkas\BerkasController::main
* @see app/Http/Controllers/Berkas/BerkasController.php:36
* @route '/berkas/{tahun?}/{statusberkas}'
*/
export const main = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: main.url(args, options),
    method: 'get',
})

main.definition = {
    methods: ["get","head"],
    url: '/berkas/{tahun?}/{statusberkas}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::main
* @see app/Http/Controllers/Berkas/BerkasController.php:36
* @route '/berkas/{tahun?}/{statusberkas}'
*/
main.url = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions) => {
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

    return main.definition.url
            .replace('{tahun?}', parsedArgs.tahun?.toString() ?? '')
            .replace('{statusberkas}', parsedArgs.statusberkas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::main
* @see app/Http/Controllers/Berkas/BerkasController.php:36
* @route '/berkas/{tahun?}/{statusberkas}'
*/
main.get = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: main.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::main
* @see app/Http/Controllers/Berkas/BerkasController.php:36
* @route '/berkas/{tahun?}/{statusberkas}'
*/
main.head = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: main.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::main
* @see app/Http/Controllers/Berkas/BerkasController.php:36
* @route '/berkas/{tahun?}/{statusberkas}'
*/
const mainForm = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: main.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::main
* @see app/Http/Controllers/Berkas/BerkasController.php:36
* @route '/berkas/{tahun?}/{statusberkas}'
*/
mainForm.get = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: main.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::main
* @see app/Http/Controllers/Berkas/BerkasController.php:36
* @route '/berkas/{tahun?}/{statusberkas}'
*/
mainForm.head = (args: { tahun?: string | number, statusberkas: string | number } | [tahun: string | number, statusberkas: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: main.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

main.form = mainForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::addriwayat
* @see app/Http/Controllers/Berkas/BerkasController.php:227
* @route '/add-riwayat/{berka}'
*/
export const addriwayat = (args: { berka: string | number } | [berka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addriwayat.url(args, options),
    method: 'post',
})

addriwayat.definition = {
    methods: ["post"],
    url: '/add-riwayat/{berka}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::addriwayat
* @see app/Http/Controllers/Berkas/BerkasController.php:227
* @route '/add-riwayat/{berka}'
*/
addriwayat.url = (args: { berka: string | number } | [berka: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return addriwayat.definition.url
            .replace('{berka}', parsedArgs.berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::addriwayat
* @see app/Http/Controllers/Berkas/BerkasController.php:227
* @route '/add-riwayat/{berka}'
*/
addriwayat.post = (args: { berka: string | number } | [berka: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addriwayat.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::addriwayat
* @see app/Http/Controllers/Berkas/BerkasController.php:227
* @route '/add-riwayat/{berka}'
*/
const addriwayatForm = (args: { berka: string | number } | [berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addriwayat.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::addriwayat
* @see app/Http/Controllers/Berkas/BerkasController.php:227
* @route '/add-riwayat/{berka}'
*/
addriwayatForm.post = (args: { berka: string | number } | [berka: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addriwayat.url(args, options),
    method: 'post',
})

addriwayat.form = addriwayatForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getverifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:682
* @route '/get-verifikator/{berka}'
*/
export const getverifikator = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getverifikator.url(args, options),
    method: 'get',
})

getverifikator.definition = {
    methods: ["get","head"],
    url: '/get-verifikator/{berka}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getverifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:682
* @route '/get-verifikator/{berka}'
*/
getverifikator.url = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getverifikator.definition.url
            .replace('{berka}', parsedArgs.berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getverifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:682
* @route '/get-verifikator/{berka}'
*/
getverifikator.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getverifikator.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getverifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:682
* @route '/get-verifikator/{berka}'
*/
getverifikator.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getverifikator.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getverifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:682
* @route '/get-verifikator/{berka}'
*/
const getverifikatorForm = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getverifikator.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getverifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:682
* @route '/get-verifikator/{berka}'
*/
getverifikatorForm.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getverifikator.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::getverifikator
* @see app/Http/Controllers/Berkas/BerkasController.php:682
* @route '/get-verifikator/{berka}'
*/
getverifikatorForm.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getverifikator.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getverifikator.form = getverifikatorForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::gethistory
* @see app/Http/Controllers/Berkas/BerkasController.php:694
* @route '/get-history/{berka}'
*/
export const gethistory = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gethistory.url(args, options),
    method: 'get',
})

gethistory.definition = {
    methods: ["get","head"],
    url: '/get-history/{berka}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::gethistory
* @see app/Http/Controllers/Berkas/BerkasController.php:694
* @route '/get-history/{berka}'
*/
gethistory.url = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return gethistory.definition.url
            .replace('{berka}', parsedArgs.berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::gethistory
* @see app/Http/Controllers/Berkas/BerkasController.php:694
* @route '/get-history/{berka}'
*/
gethistory.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gethistory.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::gethistory
* @see app/Http/Controllers/Berkas/BerkasController.php:694
* @route '/get-history/{berka}'
*/
gethistory.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: gethistory.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::gethistory
* @see app/Http/Controllers/Berkas/BerkasController.php:694
* @route '/get-history/{berka}'
*/
const gethistoryForm = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: gethistory.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::gethistory
* @see app/Http/Controllers/Berkas/BerkasController.php:694
* @route '/get-history/{berka}'
*/
gethistoryForm.get = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: gethistory.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::gethistory
* @see app/Http/Controllers/Berkas/BerkasController.php:694
* @route '/get-history/{berka}'
*/
gethistoryForm.head = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: gethistory.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

gethistory.form = gethistoryForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::store
* @see app/Http/Controllers/Berkas/BerkasController.php:75
* @route '/store-berkas'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/store-berkas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::store
* @see app/Http/Controllers/Berkas/BerkasController.php:75
* @route '/store-berkas'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::store
* @see app/Http/Controllers/Berkas/BerkasController.php:75
* @route '/store-berkas'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::store
* @see app/Http/Controllers/Berkas/BerkasController.php:75
* @route '/store-berkas'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::store
* @see app/Http/Controllers/Berkas/BerkasController.php:75
* @route '/store-berkas'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::update
* @see app/Http/Controllers/Berkas/BerkasController.php:151
* @route '/update-berkas/{berka}'
*/
export const update = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/update-berkas/{berka}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::update
* @see app/Http/Controllers/Berkas/BerkasController.php:151
* @route '/update-berkas/{berka}'
*/
update.url = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{berka}', parsedArgs.berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::update
* @see app/Http/Controllers/Berkas/BerkasController.php:151
* @route '/update-berkas/{berka}'
*/
update.put = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::update
* @see app/Http/Controllers/Berkas/BerkasController.php:151
* @route '/update-berkas/{berka}'
*/
const updateForm = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::update
* @see app/Http/Controllers/Berkas/BerkasController.php:151
* @route '/update-berkas/{berka}'
*/
updateForm.put = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Berkas\BerkasController::destroy
* @see app/Http/Controllers/Berkas/BerkasController.php:199
* @route '/destroy-berkas/{berka}'
*/
export const destroy = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/destroy-berkas/{berka}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::destroy
* @see app/Http/Controllers/Berkas/BerkasController.php:199
* @route '/destroy-berkas/{berka}'
*/
destroy.url = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{berka}', parsedArgs.berka.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::destroy
* @see app/Http/Controllers/Berkas/BerkasController.php:199
* @route '/destroy-berkas/{berka}'
*/
destroy.delete = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::destroy
* @see app/Http/Controllers/Berkas/BerkasController.php:199
* @route '/destroy-berkas/{berka}'
*/
const destroyForm = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::destroy
* @see app/Http/Controllers/Berkas/BerkasController.php:199
* @route '/destroy-berkas/{berka}'
*/
destroyForm.delete = (args: { berka: number | { id: number } } | [berka: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::edit
* @see app/Http/Controllers/Berkas/BerkasController.php:706
* @route '/edit-berkas/{id}'
*/
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/edit-berkas/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::edit
* @see app/Http/Controllers/Berkas/BerkasController.php:706
* @route '/edit-berkas/{id}'
*/
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::edit
* @see app/Http/Controllers/Berkas/BerkasController.php:706
* @route '/edit-berkas/{id}'
*/
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::edit
* @see app/Http/Controllers/Berkas/BerkasController.php:706
* @route '/edit-berkas/{id}'
*/
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::edit
* @see app/Http/Controllers/Berkas/BerkasController.php:706
* @route '/edit-berkas/{id}'
*/
const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::edit
* @see app/Http/Controllers/Berkas/BerkasController.php:706
* @route '/edit-berkas/{id}'
*/
editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::edit
* @see app/Http/Controllers/Berkas/BerkasController.php:706
* @route '/edit-berkas/{id}'
*/
editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::find
* @see app/Http/Controllers/Berkas/BerkasController.php:0
* @route '/find-berkas/{id}'
*/
export const find = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: find.url(args, options),
    method: 'get',
})

find.definition = {
    methods: ["get","head"],
    url: '/find-berkas/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::find
* @see app/Http/Controllers/Berkas/BerkasController.php:0
* @route '/find-berkas/{id}'
*/
find.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return find.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::find
* @see app/Http/Controllers/Berkas/BerkasController.php:0
* @route '/find-berkas/{id}'
*/
find.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: find.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::find
* @see app/Http/Controllers/Berkas/BerkasController.php:0
* @route '/find-berkas/{id}'
*/
find.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: find.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::find
* @see app/Http/Controllers/Berkas/BerkasController.php:0
* @route '/find-berkas/{id}'
*/
const findForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: find.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::find
* @see app/Http/Controllers/Berkas/BerkasController.php:0
* @route '/find-berkas/{id}'
*/
findForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: find.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::find
* @see app/Http/Controllers/Berkas/BerkasController.php:0
* @route '/find-berkas/{id}'
*/
findForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: find.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

find.form = findForm

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detail
* @see app/Http/Controllers/Berkas/BerkasController.php:718
* @route '/detail-berkas/{id}'
*/
export const detail = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(args, options),
    method: 'get',
})

detail.definition = {
    methods: ["get","head"],
    url: '/detail-berkas/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detail
* @see app/Http/Controllers/Berkas/BerkasController.php:718
* @route '/detail-berkas/{id}'
*/
detail.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return detail.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detail
* @see app/Http/Controllers/Berkas/BerkasController.php:718
* @route '/detail-berkas/{id}'
*/
detail.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detail
* @see app/Http/Controllers/Berkas/BerkasController.php:718
* @route '/detail-berkas/{id}'
*/
detail.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detail.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detail
* @see app/Http/Controllers/Berkas/BerkasController.php:718
* @route '/detail-berkas/{id}'
*/
const detailForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: detail.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detail
* @see app/Http/Controllers/Berkas/BerkasController.php:718
* @route '/detail-berkas/{id}'
*/
detailForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: detail.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Berkas\BerkasController::detail
* @see app/Http/Controllers/Berkas/BerkasController.php:718
* @route '/detail-berkas/{id}'
*/
detailForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: detail.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

detail.form = detailForm

const berkas = {
    main: Object.assign(main, main),
    addriwayat: Object.assign(addriwayat, addriwayat),
    getverifikator: Object.assign(getverifikator, getverifikator),
    gethistory: Object.assign(gethistory, gethistory),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    edit: Object.assign(edit, edit),
    find: Object.assign(find, find),
    detail: Object.assign(detail, detail),
}

export default berkas