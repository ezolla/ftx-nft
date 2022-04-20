import { useEffect, useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Navigation from 'components/Navigation'
import Button from 'components/forms/Button'
import CollectionCard from 'components/collections/CollectionCard'
import { Collection } from 'safety/interfaces'

interface CollectionsResponse {
  success: boolean
  result: {
    count: number
    collections: Collection[]
  }
}

const Home = (props: CollectionsResponse | null) => {
  // State
  const [collectionsData, setCollectionsData] = useState<Collection[] | null>(
    null
  )
  const [totalCount, setTotalCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    console.log(props)
    if (props && props.success) {
      // Update collections and total count
      setCollectionsData(props.result.collections)
      setTotalCount(props.result.count)
    } else {
      console.log('Throw an error notification')
    }
  }, [])

  // Fetches more collections
  const fetchMoreCollections = async (page: number) => {
    // Update page
    setPage(page)

    // Fetch collections
    const collections = await fetchCollections(page)

    // Update collections
    setCollectionsData([...collectionsData, ...collections.result.collections])
  }

  return (
    <>
      <Head>
        <title>FTX NFT</title>
      </Head>

      {/* Navigation */}
      <Navigation />

      <MainContent>
        {/* Header */}
        <Header>
          <p>
            {page * 25} of {totalCount}
          </p>
        </Header>

        {/* Collections */}
        {collectionsData ? (
          <>
            {/* Cards */}
            <CollectionsContainer>
              {collectionsData.map((collection, index) => (
                <CollectionCard
                  image={
                    collection.collectionDict &&
                    collection.collectionDict.cardImageUrl
                      ? collection.collectionDict.cardImageUrl
                      : collection.first_nft.imageUrl
                  }
                  name={
                    collection.collectionDict
                      ? collection.collectionDict.displayName
                      : 'None'
                  }
                  total={collection.total}
                  volume={collection.volume}
                  index={index}
                />
              ))}
            </CollectionsContainer>

            {/* Pagination */}
            <ButtonContainer>
              <Button onClick={() => fetchMoreCollections(page + 1)}>
                Load more collections...
              </Button>
            </ButtonContainer>
          </>
        ) : (
          <p>No collections.</p>
        )}
      </MainContent>
    </>
  )
}

export default Home

export const getServerSideProps = async () => {
  // Fetch collections
  const collections = await fetchCollections(1)

  // Provide data
  return { props: collections }
}

// Fetches collections
const fetchCollections = async (page: number) => {
  // Find starting and ending collections
  const startPoint = page * 25 - 25
  const endPoint = page * 25

  // Sending request
  const response = await fetch(
    `${process.env.API_URL}/nft/collections_page?startInclusive=${startPoint}&endExclusive=${endPoint}`,
    {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }
  )

  // Extract response's data
  const data: CollectionsResponse = await response.json()

  // Return data
  return data || null
}

const MainContent = styled.main`
  padding: 24px;
`

const Header = styled.header`
  margin-bottom: 20px;
`

const CollectionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 940px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 420px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const ButtonContainer = styled.div`
  margin: 20px 0 50px;
`
