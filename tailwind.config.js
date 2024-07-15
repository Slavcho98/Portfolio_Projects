/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/js/controller.js',
        './src/js/Views/View.js',
        './src/js/Views/homeView.js',
        './src/js/Views/infoView.js',
        './src/js/Views/discussView.js',
        './src/js/Views/contactView.js',
        './src/js/Views/loginView.js',
        './src/js/Views/profileView.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
            },
            backgroundImage: {
                'custom-gradient':
                    'linear-gradient(180deg, rgba(131, 234, 177, 0.7) 0%, rgba(75, 124, 243, 0.7) 100%);',
                'custom-gradient-2':
                    'linear-gradient(180deg, rgba(66, 53, 107, 0.8) 0%, rgba(153, 70, 243, 0.16) 100%);',
                'custom-gradient-3':
                    'linear-gradient(180deg, rgba(153, 70, 243, 0.8) 0%, rgba(66, 53, 107, 0.8) 100%)',
                'navbar-gradient':
                    'linear-gradient(180deg, rgba(118, 79, 240, 0.4) 0%, rgba(118, 79, 240, 0) 100%), radial-gradient(200.39% 673.83% at 3.67% 23.83%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%);',
            },

            width: {
                'width-lg': 'calc(33.333% - 20px)',
                'width-tablet': 'calc(50% - 20px)',
            },
            
            blur: {
                backdrop: 'backdrop-blur',
            },
            
            colors: {
                'regal-color': '#4B7CF366',
                'links-color': '#42356B',
                'custom-pink': '#9946F3',
                'custom-pink-2': '#764FF066',
                'regal-blue': '#4B7CF366',
                'minty-lime': '#83EAB166',
                'par-custom': '#152347',
                'h3': '#764FF0',
                "neon": "#83EAB1CC",
            },

            boxShadow: {
                'custom-shadow': '0px 8px 16px 0px rgba(66, 53, 107, 0.2)',
            },

            dropShadow: {
                '3xl': '4px 4px 2px rgba(153,70,243,0.3)',
            },

            lineHeight: {
                placeholder: '1.2', // Adjust as needed for placeholder
                text: '1.6', // Adjust as needed for text
            },
        },
    },
    plugins: [],
    corePlugins: {
        components: true,
    },
};
