import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { gql, GraphQLClient } from 'graphql-request'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic';
import Script from 'next/script'

const HeaderAds = dynamic(() => import('../component/header-ad'), {
  ssr: false,
});
const FooterAd = dynamic(() => import('../component/footer-ad'), {
  ssr: false,
});
const BeforeContentAds = dynamic(() => import('../component/before-content-ad'), {
  ssr: false,
});
const AfterContentAds = dynamic(() => import('../component/after-content-ad'), {
  ssr: false,
});
const VideoAd = dynamic(() => import('../component/video-ad'), {
  ssr: false,
});

const getEndpoint = async () => {
  return process.env?.GRAPHQL_ENDPOINT || ''
}

export const getServerSideProps = async (ctx) => {
  const endpoint = await getEndpoint()
  const graphQLClient = new GraphQLClient(
    endpoint.includes('graphql') ? endpoint : endpoint.concat('/graphql')
  )

  const pathArr = ctx.query.postpath
  const path = pathArr.join('/')

  const query = gql`
		{
			post(id: "/${path}/", idType: URI) {
				id
				excerpt
				title
				link
				dateGmt
				modifiedGmt
				content
				author {
					node {
						name
					}
				}
				featuredImage {
					node {
						sourceUrl
						altText
					}
				}
			}
		}
	`

  const data = await graphQLClient.request(query)
  if (!data?.post) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      path,
      post: data.post,
      host: ctx.req.headers.host
    }
  }
}

const Post = (props) => {
  const { post, host, path } = props
  const content = addAdsAfterImgTag(post.content)

  // to remove tags from excerpt
  const removeTags = (str) => {
    if (str === null || str === '') return ''
    else str = str.toString()
    return str.replace(/(<([^>]+)>)/gi, '').replace(/\[[^\]]*\]/, '')
  }

  return (
    <>
      <HeaderAds/>
      <Head>
        <meta property="og:title" content={post.title}/>
        <link rel="canonical" href={`https://${host}/${path}`}/>
        <meta property="og:description" content={removeTags(post.excerpt)}/>
        <meta property="og:url" content={`https://${host}/${path}`}/>
        <meta property="og:type" content="article"/>
        <meta property="og:locale" content="en_US"/>
        <meta property="og:site_name" content={host.split('.')[0]}/>
        <meta property="article:published_time" content={post.dateGmt}/>
        <meta property="article:modified_time" content={post.modifiedGmt}/>
        <meta property="og:image" content={post?.featuredImage?.node?.sourceUrl || ''}/>
        <meta
          property="og:image:alt"
          content={post.featuredImage?.node?.altText || post.title}
        />
        <HeaderAds/>
        <VideoAd/>
        <title>{post.title}</title>
      </Head>
      <HeaderAds/>
      <div className="post-container">
        <VideoAd/>
        <HeaderAds/>
        <div className={styles.style_header}>
          <div className={styles.home_container}>
            <div className={styles.header_search}>
              <div style={{ marginLeft: '30px' }}>
                <Link href="/">
                  <a>Live News</a>
                </Link>
              </div>

              <div className={styles.form_search}>
                <input
                  className={styles.search_input}
                  placeholder="Search"
                  // onChange={(e) => setValue(e.target.value)}
                />

                <button
                  className={styles.search_submit}
                  // onClick={() => setValueSearch(value)}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <BeforeContentAds/>
        <h1>{post.title}</h1>
        <img
          src={post.featuredImage?.node?.sourceUrl}
          alt={post.featuredImage?.node?.altText || post.title}
        />
        <div>
          <div>
            <div id="M933560ScriptRootC1569962"></div>
            <Script src="https://jsc.adskeeper.com/s/p/sport247.boonovel.com.1569962.js" async></Script>
          </div>
        </div>
        <article dangerouslySetInnerHTML={{ __html: content }}/>
        <AfterContentAds/>
      </div>
      <FooterAd/>
    </>
  )
}

function addAdsAfterImgTag(htmlString) {
  return htmlString.replaceAll(/(<img[^>]*>)/g, '$1<div>\n' +
    '            <div id="M933560ScriptRootC1569962"></div>\n' +
    '            <Script src="https://jsc.adskeeper.com/s/p/sport247.boonovel.com.1569962.js" async></Script>\n' +
    '          </div>');
}

export default Post
