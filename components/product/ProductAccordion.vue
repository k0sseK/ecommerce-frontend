<script setup lang="ts">
defineProps(['description'])
</script>

<template>
    <div>
        <Accordion value="0" expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
            <AccordionPanel value="0">
                <AccordionHeader>
                    <span class="uppercase font-semibold text-md"
                        >{{ $t('product_description') }}
                    </span>
                </AccordionHeader>
                <AccordionContent>
                    <p class="m-0 text-sm font-normal">
                        {{ description }}
                    </p>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="1">
                <AccordionHeader>
                    <span class="uppercase font-semibold text-md"
                        >{{ $t('product_size_chart') }}
                    </span>
                </AccordionHeader>
                <AccordionContent>
                    <p class="m-0 text-sm font-normal">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit, sed quia consequuntur magni dolores eos
                        qui ratione voluptatem sequi nesciunt. Consectetur,
                        adipisci velit, sed quia non numquam eius modi.
                    </p>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    </div>
</template>

<style scoped>
:deep(.p-accordionpanel:last-child) {
    border: none;
}

:deep(.p-accordionheader) {
    background: transparent;
}

:deep(.p-accordioncontent-content) {
    background: transparent;
}
</style>
