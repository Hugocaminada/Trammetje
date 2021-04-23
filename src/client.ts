import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: 'o3vvn7pb',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: true,
})
