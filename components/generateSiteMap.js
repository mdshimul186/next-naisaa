const fs = require('fs')
const globby = require('globby')
  const axios = require('axios')

async function generateSiteMap() {
  const pages = await globby([
    '!pages/**/*.js',
    'pages/service.js',
    'pages/*.js',
    '!pages/admin.js',
    '!pages/**/[orderid].js',
    '!pages/user/chat/*.js',
    '!pages/user/*.js',
    '!pages/_*.js',
 
  ])

  const cat = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/get`)
  const gig = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/gig/get`)
  
  let allpages = [...pages]
  
  cat.data.category.forEach(cat => allpages.push(`categories/${cat.categoryslug}`));
  gig.data.gig.forEach(gig => allpages.push(`service/${gig.slug}`));


  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-stylesheet href="sitemap.css" type="text/css"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${allpages
            .map(page => {
              const path = page
                .replace('pages/', '')
                .replace('.js', '')
                .replace('.md', '')
              const route = path === '/index' ? '' : path
              return `
                      <url>
                          <loc>${`https://next-naissa.herokuapp.com/${route}`}</loc>
                      </url>
                  `
            })
            .join('')}
      </urlset>
  `

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSiteMap()