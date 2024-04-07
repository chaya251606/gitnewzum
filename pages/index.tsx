import type {NextPage} from 'next'
import {GetServerSideProps} from "next";
import styles from '../styles/Home.module.css'
import {gql, GraphQLClient} from 'graphql-request'
import {useEffect, useState} from "react";
import Link from 'next/link'

const getEndpoint = async (ctx: any): Promise<string> => {
  return process.env?.GRAPHQL_ENDPOINT || ''
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const endpoint = await getEndpoint(ctx)
  const graphQLClient = new GraphQLClient(
    endpoint.includes('graphql') ? endpoint : endpoint.concat('/graphql')
  )

  const query = gql`
		{
      posts(where: {author: 1}) {
        nodes {
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
    }
	`

  const data = await graphQLClient.request(query)

  if (!data?.posts?.nodes?.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: data?.posts?.nodes || []
    }
  }
}

const Home: NextPage = (props: any) => {
  const {data} = props;

  const [value, setValue] = useState('')
  const [valueSearch, setValueSearch] = useState('')
  let [timeout, setTimeOut] = useState<any>(null)

  const handleSearch = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      setValueSearch(value)
    }, 500)
    setTimeOut(timeout)
  }

  useEffect(() => {
    handleSearch()
  }, [value])

  const formatLink = (url: string) => {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname
  }

  return (
    <div style={{backgroundColor: "#F3F4F5"}}>
      <div className={styles.style_header}>
        <div className={styles.home_container}>
          <div className={styles.header_search}>
            <div style={{marginLeft: '30px'}}>
              <Link href="/">
                <a>Live News</a>
              </Link>
            </div>

            <div className={styles.form_search}>
              <input className={styles.search_input} placeholder="Search" onChange={(e) => setValue(e.target.value)} />

              <button className={styles.search_submit} onClick={() => setValueSearch(value)}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.home_container}>
          <div className={styles.home_body}>
            <div className={styles.box_left}>
              {
                data?.length ? data.filter((e: any) => e.title.includes(valueSearch)).map((e: any, index: number) => (
                  <>
                    <div key={e.id} className={styles.post_item}>
                      <a href={formatLink(e.link)} className={styles.post_img}>
                        <img src={e.featuredImage?.node?.sourceUrl} alt="" />
                      </a>

                      <div>
                        <a href={formatLink(e.link)} className={styles.post_title}>{e.title}</a>

                        <div className={styles.entry_meta}>
                          <span>{e.author?.node?.name}</span>

                          <span>.</span>

                          <span>{e.modifiedGmt ? new Date(e.modifiedGmt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }): ""}</span>
                        </div>

                        <div dangerouslySetInnerHTML={{ __html: e?.excerpt }} className={styles.post_excerpt} />
                      </div>


                    </div>

                    {index !== data?.length - 1 ? <div className={styles.divider} key={index} /> : null}
                  </>
                ))  : null
              }
            </div>

            <div className={styles.box_right}>
              <div className={`${styles.box_right_item} ${styles.box_recent_post}`}>
                <span className={styles.title_right}>Recent Posts</span>

                <div className={styles.recent_post}>
                  {
                    data?.length ? data.map((e: any, index: number) => index < 5 && (
                      <a key={e.id} href={formatLink(e.link)} className={styles.recent_post_item}>{e.title}</a>
                    ))  : null
                  }
                </div>
              </div>

              <div className={styles.box_right_item}>
                <span className={styles.title_right}>Recent Comments</span>

                <a href="#">A WordPress
                  Commenter</a> on <a href="#">Hello world!</a>
              </div>

              <div className={styles.box_right_item}>
                <span className={styles.title_right}>Archives</span>

                <div className={styles.mb_20}><a href="#">April 2024</a></div>

                <div className={styles.mb_20}><a href="#">March 2024</a></div>

                <div><a href="#">February 2024</a></div>
              </div>

              <div className={styles.box_right_item}>
                <span className={styles.title_right}>Categories</span>

                <div className={styles.mb_20}>
                  <a href="#">Entertaiment</a>
                </div>

                <div className={styles.mb_20}>
                  <a href="#">home</a>
                </div>

                <div>
                  <a href="#">Uncategorized</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer_home}>
        <div className={styles.footer_menu}>
          <Link href="/privacy-policy">Privacy Policy</Link>

          <Link href="/term-condition">Terms and Conditions</Link>

          <Link href="/contact">Contact US</Link>
        </div>

        <div className={styles.site_info}>
          © 2024 <a href="#">Live News</a> - <a href="#">WordPress
          Theme</a> by <a href="#">WPEnjoy</a>
        </div>
      </footer>
    </div>
  )
}

export default Home
