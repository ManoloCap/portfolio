export function getProgrammingLanguageColor(language: string): string | undefined {
  const languageColorMap: Map<string, string> = new Map<string, string>([
    ['Python', 'bg-gradient-to-r from-blue-300 via-yellow-300 to-blue-300'], // Maintained consistency
    ['Docker', 'bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300'], // Cyan and Blue at lower tones
    ['JavaScript', 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300'], // Yellow
    ['Java', 'bg-gradient-to-r from-red-300 via-gray-300 to-red-300'], // Reduced to use lighter shades
    ['C#', 'bg-gradient-to-r from-purple-300 via-purple-400 to-purple-300'], // Purple lighter tone
    ['C++', 'bg-gradient-to-r from-blue-300 via-gray-400 to-blue-300'], // Blue and Gray
    ['Ruby', 'bg-gradient-to-r from-red-300 via-red-400 to-red-300'], // Predominantly Red
    ['TypeScript', 'bg-gradient-to-r from-blue-300 via-indigo-400 to-blue-300'], // Blue and Indigo
    ['Go', 'bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300'], // Cyan and Blue
    ['Rust', 'bg-gradient-to-r from-orange-300 via-brown-400 to-orange-300'], // Orange and Brown
    ['PHP', 'bg-gradient-to-r from-indigo-300 via-purple-400 to-indigo-300'], // Indigo and Purple
    ['Swift', 'bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300'], // Orange
    ['Kotlin', 'bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300'], // Purple and Pink
    ['Objective-C', 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300'], // Gray
    ['R', 'bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300'], // Blue
    ['Scala', 'bg-gradient-to-r from-red-300 via-red-400 to-red-300'], // Red
    ['Shell', 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300'], // Gray
    ['Perl', 'bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300'], // Pink
    ['Lua', 'bg-gradient-to-r from-blue-300 via-purple-400 to-blue-300'], // Blue and Purple
    ['Haskell', 'bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-300'], // Indigo

    // New entries
    ['Google Cloud', 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500'], // Google Cloud Blue
    ['Amazon Web Services', 'bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500'], // AWS Orange and Yellow
    ['Microsoft Azure', 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600'], // Azure Blue
    ['Firebase', 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400'], // Firebase Yellow
    ['FastApi', 'bg-gradient-to-r from-green-400 via-green-500 to-green-400'], // FastApi Green
    ['Django', 'bg-gradient-to-r from-green-700 via-green-800 to-green-700'], // Django Green
    ['Flask', 'bg-gradient-to-r from-gray-500 via-gray-600 to-gray-500'], // Flask Gray
    ['Postgres', 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400'], // Postgres Blue
    ['MongoDB', 'bg-gradient-to-r from-green-500 via-green-600 to-green-500'], // MongoDB Green
    ['MariaDB', 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600'], // MariaDB Blue
    ['Google Maps', 'bg-gradient-to-r from-blue-500 via-green-400 to-blue-500'], // Google Maps Blue/Green
    ['VueJs', 'bg-gradient-to-r from-green-400 via-green-500 to-green-400'], // Vue Green
    ['ReactJs', 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400'], // React Blue
    ['Angular', 'bg-gradient-to-r from-red-600 via-red-700 to-red-600'], // Angular Red
    ['OpenAI', 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700'], // OpenAI Gray
    ['LLMs', 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500'], // LLMs Purple
    ['Druid', 'bg-gradient-to-r from-blue-700 via-black to-blue-700'], // Druid Blue
    ['SQL', 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500'], // SQL Blue
    ['CSS', 'bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-500'], // CSS Blue
    ['Tailwind', 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400'], // Tailwind Blue
    ['SCSS', 'bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500'], // SCSS Pink

    //AI Hints
    ['GraphQL', 'bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400'], // GraphQL Pink
    ['Redis', 'bg-gradient-to-r from-red-500 via-red-600 to-red-500'], // Redis Red
    ['Kafka', 'bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500'], // Kafka Orange
    ['RabbitMQ', 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400'], // RabbitMQ Orange
    ['ElasticSearch', 'bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-600'], // ElasticSearch Yellow
    ['Kubernetes', 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600'], // Kubernetes Blue
    ['Jenkins', 'bg-gradient-to-r from-blue-500 via-gray-600 to-blue-500'], // Jenkins Blue/Gray
    ['Terraform', 'bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-400'], // Terraform Indigo
    ['Ansible', 'bg-gradient-to-r from-red-600 via-gray-700 to-red-600'], // Ansible Red/Gray
    ['Puppet', 'bg-gradient-to-r from-orange-500 via-yellow-600 to-orange-500'], // Puppet Orange/Yellow
    ['Chef', 'bg-gradient-to-r from-red-500 via-orange-600 to-red-500'], // Chef Red/Orange
    ['GitHub Actions', 'bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800'], // GitHub Actions Dark/Blue
    ['Travis CI', 'bg-gradient-to-r from-green-400 via-blue-500 to-green-400'], // Travis Green/Blue
    ['CircleCI', 'bg-gradient-to-r from-green-500 via-gray-600 to-green-500'], // CircleCI Green
    ['Bitbucket', 'bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-500'], // Bitbucket Blue
    ['GitLab', 'bg-gradient-to-r from-orange-400 via-red-500 to-orange-400'], // GitLab Orange/Red
    ['Heroku', 'bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-500'], // Heroku Purple
    ['Netlify', 'bg-gradient-to-r from-green-300 via-blue-400 to-green-300'], // Netlify Green/Blue
    ['Vercel', 'bg-gradient-to-r from-black via-gray-800 to-black'], // Vercel Black/Gray
    ['Webpack', 'bg-gradient-to-r from-blue-300 via-yellow-400 to-blue-300'], // Webpack Blue/Yellow
    ['Babel', 'bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600'], // Babel Yellow/Orange
    ['ESLint', 'bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500'], // ESLint Purple
    ['Prettier', 'bg-gradient-to-r from-pink-300 via-pink-500 to-pink-300'], // Prettier Pink
    ['Storybook', 'bg-gradient-to-r from-red-400 via-purple-500 to-red-400'], // Storybook Red/Purple
    ['Sass', 'bg-gradient-to-r from-pink-600 via-pink-700 to-pink-600'], // Sass Pink
    ['Jest', 'bg-gradient-to-r from-green-500 via-red-500 to-green-500'], // Jest Green/Red
    ['Mocha', 'bg-gradient-to-r from-brown-500 via-brown-600 to-brown-500'], // Mocha Brown
    ['Jasmine', 'bg-gradient-to-r from-purple-300 via-purple-400 to-purple-300'], // Jasmine Purple
    ['Cypress', 'bg-gradient-to-r from-green-400 via-green-500 to-green-400'], // Cypress Green
    ['Enzyme', 'bg-gradient-to-r from-blue-500 via-green-600 to-blue-500'], // Enzyme Blue/Green
    ['Capacitor', 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400'], // Capacitor Blue
    ['Nginx', 'bg-gradient-to-r from-green-600 via-green-700 to-green-600'], // Nginx Green
    ['Apache', 'bg-gradient-to-r from-red-500 via-red-600 to-red-500'], // Apache Red
    ['Lets Encrypt', 'bg-gradient-to-r from-green-400 via-blue-500 to-green-400'], // Let's Encrypt Green/Blue
    ['JWT', 'bg-gradient-to-r from-gray-500 via-orange-500 to-gray-500'], // JWT Gray/Orange
    ['OAuth', 'bg-gradient-to-r from-blue-500 via-green-500 to-blue-500'], // OAuth Blue/Green
    ['OAuth2', 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600'], // OAuth2 Blue
    ['Next.js', 'bg-gradient-to-r from-black via-gray-800 to-black'], // Next.js Black/Gray
    ['Nuxt.js', 'bg-gradient-to-r from-green-600 via-green-700 to-green-600'], // Nuxt.js Green
    ['Expo', 'bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500'], // Expo Orange/Yellow
    ['Xamarin', 'bg-gradient-to-r from-blue-800 via-cyan-900 to-blue-800'], // Xamarin Blue
    ['Unity', 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300'], // Unity Gray
    ['Unreal Engine', 'bg-gradient-to-r from-gray-700 via-blue-800 to-gray-700'], // Unreal Engine Dark/Blue
    ['Three.js', 'bg-gradient-to-r from-orange-500 via-red-600 to-orange-500'], // Three.js Orange/Red
    ['D3.js', 'bg-gradient-to-r from-yellow-600 via-orange-700 to-yellow-600'], // D3.js Yellow/Orange
    ['Chart.js', 'bg-gradient-to-r from-purple-400 via-red-500 to-purple-400'], // Chart.js Purple/Red
    ['Dash', 'bg-gradient-to-r from-gray-400 via-blue-500 to-gray-400'], // Dash Gray/Blue
    ['DataDog', 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500'], // DataDog Purple
    ['SCRUM', 'bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-300'], // SCRUM Orange/Yellow
    ['Airflow', 'bg-gradient-to-r from-blue-300 via-green-300 to-blue-300'] // Airflow Blue/Green
  ]);

  return languageColorMap.get(language);
}