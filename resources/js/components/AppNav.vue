<template>
    <nav class="bg-gradient-to-b from-gray-800 to-gray-900 border-b text-white">
        <div class="container flex flex-col sm:flex-row sm:items-center mx-auto px-2 py-2 lg:py-4 xl:py-4">
            <router-link to="/" class="flex gap-2 items-center">

                <!-- TODO: redo SVGs to not rely on shadow filters to fix Safari rendering issue -->

                <img src="/img/logo/32px.svg" class="h-8 w-8" alt="Imprint glyph mark, a purple book with white italic &quot;im&quot; text and a red bookmark.">
                <span class="hidden sm:block text-xl text-gray-100">Imprint</span>
            </router-link>
            <div class="sm:ml-auto">
                <router-link to="/register" class="btn btn-black">
                    Get started
                </router-link>
            </div>
        </div>
    </nav>
</template>
