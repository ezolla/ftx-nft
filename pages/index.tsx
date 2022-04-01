import { useEffect, useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Navigation from 'components/Navigation'
import CollectionCard from 'components/collections/CollectionCard'
import { Collection } from 'safety/interfaces'

interface CollectionsResponse {
  collections: {
    success: boolean
    result: {
      count: number
      collections: Collection[]
    }
  }
}

const Home = (props: CollectionsResponse) => {
  // State
  const [collectionsData, setCollectionsData] = useState<Collection[] | null>(
    null
  )

  useEffect(() => {
    if (props.collections.success) {
      console.log('Collections success!')
      setCollectionsData(props.collections.result.collections)
    } else {
      console.log('Throw an error notification')
    }
  }, [])

  return (
    <>
      <Head>
        <title>FTX NFT</title>
      </Head>

      {/* Navigation */}
      <Navigation />

      <MainContent>
        {/* Actions */}
        <ActionsContainer>
          <p>Search</p>
          <div>
            <p>All</p>
            <p>FTX</p>
            <p>SOL</p>
            <p>ETH</p>
          </div>
        </ActionsContainer>

        {/* Collections */}
        {collectionsData ? (
          <CollectionsContainer>
            {collectionsData.map((collection, index) => (
              <CollectionCard
                image={
                  collection.collectionDict.cardImageUrl ||
                  collection.first_nft.imageUrl
                }
                name={collection.collectionDict.displayName}
                total={collection.total}
                volume={collection.volume}
                index={index}
              />
            ))}
          </CollectionsContainer>
        ) : (
          <p>No collections.</p>
        )}
      </MainContent>
    </>
  )
}

export default Home

Home.getInitialProps = async () => {
  // Fetches collections
  const fetchCollections = async () => {
    try {
      // Sending request
      const response = await fetch(
        `${process.env.API_URL}/nft/collections_page?startInclusive=0&endExclusive=8`,
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
      return data
    } catch (error) {
      console.log(error)
    }
  }

  // Fetch collections
  const collections = await fetchCollections()

  // Provide data
  return { collections: collections }
}

const MainContent = styled.main`
  padding: 24px;
`

const ActionsContainer = styled.div`
  display: flex;

  p {
    margin-right: 10px;
  }

  div {
    display: flex;
  }
`

const CollectionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;
  margin-top: 24px;

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
