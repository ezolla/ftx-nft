import { useEffect, useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Navigation from 'components/Navigation'
import CollectionCard from 'components/collections/CollectionCard'
import { Collection } from 'safety/interfaces'

interface CollectionsResponse {
  success: boolean
  result: {
    count: number
    collections: Collection[]
  }
}

const Home = () => {
  // State
  const [collections, setCollections] = useState<Collection[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    // Start loading
    setLoading(true)

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

        if (response.status === 200) {
          // Update collections
          setCollections(data.result.collections)
        }
      } catch (error) {
        console.log('An error happened!!!')
        console.log(error)
      }

      // Stop loading
      setLoading(false)
    }

    fetchCollections()
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
        {!loading ? (
          <>
            {collections ? (
              <CollectionsContainer>
                {collections.map((collection, index) => (
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
          </>
        ) : (
          <p>Loading NFT collections...</p>
        )}
      </MainContent>
    </>
  )
}

export default Home

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
