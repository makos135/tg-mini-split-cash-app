import {usePassThrough} from "primevue/passthrough";
import Tailwind from "primevue/passthrough/tailwind";

const CustomTailwind = usePassThrough(
    Tailwind,
    {
        menu: {
            root: 'text-xs w-fit',
            menu: {
                class: ['!p-1']
            },
            content: ({context}) => ({
                class: [
                    '!rounded',
                    '', // Hover
                    {
                        '': context.focused
                    }
                ]
            }),
            action: {
                class: ['!pl-2']
            },
            icon: 'bg-black color-red',
            submenuheader: {
                class: ['']
            },
        },
        button: {
            root: '!bg-button_color !border-none justify-center hover:!bg-button_color',
            label: '!flex-none !text-button_text_color',
            icon: '!text-button_text_color'
        },
        dialog: {
            root: '!w-full m-10 !bg-secondary_bg_color',
            closeButton: '!shadow-[0_0_0_0.2rem_rgba(var(--button-transparent-color))]',
            headerTitle: '!text-text_color',
            header: '!bg-secondary_bg_color',
            content: '!bg-secondary_bg_color',
        },
        chip: {
            root: '!bg-button_transparent_color',
            label: '!text-button_text_color',
            icon: '!text-button_text_color'
        },
        card: {
            root: 'bg-secondary_bg_color',
            title: '!text-button_text_color',
        },
        multiselect: {
            option: '!text-dark',
        }

    },
    {
        mergeSections: true,
        mergeProps: false
    },
);
export default CustomTailwind;
