import { useEffect, useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Navigation from 'components/Navigation'
import DetailsHeader from 'components/collections/DetailsHeader'
import NFTCard from 'components/collections/NFTCard'
import { CollectionDetails, CollectionNft } from 'safety/interfaces'

interface Props {
  details: CollectionDetailsResponse
  nfts: CollectionNftsResponse
}

interface CollectionDetailsResponse {
  success: boolean
  result: CollectionDetails
}

interface CollectionNftsResponse {
  success: boolean
  result: {
    total: number
    count: number
    nfts: CollectionNft[]
  }
}

const Collection = (data: Props) => {
  // State
  const [details, setDetails] = useState<CollectionDetails | null>(null)
  const [nfts, setNfts] = useState<CollectionNft[] | null>(null)

  useEffect(() => {
    if (
      data.details &&
      data.details.success &&
      data.nfts &&
      data.nfts.success
    ) {
      // Update state
      setDetails(data.details.result)
      setNfts(data.nfts.result.nfts)
    } else {
      // Handle error
      console.log('Error occurred fetching collection details and/or nfts.')
    }
  }, [])

  return (
    <>
      <Head>
        <title>
          {details ? `${details.collectionDict.displayName} |` : null} FTX NFT
        </title>
      </Head>

      {/* Navigation */}
      <Navigation />

      <main>
        {/* Banner & Header */}
        {details ? (
          <DetailsHeader details={details} />
        ) : (
          <div style={{ borderBottom: '1px solid var(--color-mercury)' }}>
            <p style={{ padding: '24px' }}>No available details.</p>
          </div>
        )}

        {/* Collection's NFTs */}
        <NftsContainer>
          {/* Actions */}
          <ActionsSidebar>
            <p>Space for future NFT filtering and searching implementation.</p>
          </ActionsSidebar>

          {/* Available NFTs */}
          {nfts ? (
            <GridContainer>
              {nfts
                ? nfts.map((nft, index) => <NFTCard nft={nft} key={index} />)
                : null}
            </GridContainer>
          ) : (
            <p style={{ padding: '24px' }}>No NFTs available.</p>
          )}
        </NftsContainer>
      </main>
    </>
  )
}

export default Collection

export const getServerSideProps = async (ctx) => {
  // Define collection ID
  const collectionId = ctx.query.id

  // Fetches collection details
  const fetchCollectionDetails = async (id: string) => {
    try {
      // Sending request
      const response = await fetch(
        `${process.env.API_URL}/nft/collection/${id}`,
        {
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        }
      )

      // Extract response's data
      const collectionDetails: CollectionDetailsResponse = await response.json()

      // Return data
      return collectionDetails
    } catch (error) {
      console.log(error)
    }
  }

  // Fetches collection NFTs
  const fetchCollectionNfts = async (id: string) => {
    try {
      // Sending request
      const response = await fetch(
        `${process.env.API_URL}/nft/nfts_filtered?startInclusive=0&endExclusive=25&nft_filter_string=%7B%22collection%22%3A%22${id}%22%2C%22nftAuctionFilter%22%3A%22all%22%2C%22minPriceFilter%22%3Anull%2C%22maxPriceFilter%22%3Anull%2C%22seriesFilter%22%3A%5B%5D%2C%22traitsFilter%22%3A%7B%7D%2C%22searchStringFilter%22%3Anull%2C%22mintSourceFilter%22%3Anull%2C%22include_not_for_sale%22%3Atrue%7D&sortFunc=offer_asc`,
        {
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        }
      )

      // Extract response's data
      const collectionNfts: CollectionNftsResponse = await response.json()

      // Return data
      return collectionNfts
    } catch (error) {
      console.log(error)
    }
  }

  // Fetch collection details
  const collectionDetails = await fetchCollectionDetails(collectionId as string)

  // Fetch collection NFTs
  const collectionNfts = await fetchCollectionNfts(collectionId as string)

  // Provide data
  return { props: { details: collectionDetails, nfts: collectionNfts } }
}

const NftsContainer = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;

  @media (max-width: 860px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const ActionsSidebar = styled.aside`
  padding: 24px;
  border-right: 1px solid var(--color-mercury);

  @media (max-width: 860px) {
    border-right: none;
    border-bottom: 1px solid var(--color-mercury);
  }
`

const GridContainer = styled.div`
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 860px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 680px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
