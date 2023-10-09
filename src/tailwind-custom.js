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
            root: 'bg-primary border-none justify-center',
            label: '!flex-none'
        },
        dialog: {
            root: '',
            closeButton: '!shadow-[0_0_0_0.2rem_rgba(69,111,73,0.5)]'
        }
    },
    {
        mergeSections: true,
        mergeProps: false
    },
);
export default CustomTailwind;
