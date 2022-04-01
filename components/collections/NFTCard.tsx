import Image from 'next/image'
import styled from 'styled-components'

import { CollectionNft } from 'safety/interfaces'

interface Props extends React.HTMLProps<HTMLDivElement> {
  nft: CollectionNft
}

const NFTCard = ({ nft }: Props) => {
  return (
    <StyledNFTCard>
      {/* Image */}
      {nft ? (
        <Image src={nft.imageUrl} alt={nft.name} width={500} height={500} />
      ) : (
        <Image
          src='https://i.imgur.com/AWgnjF3.png'
          alt='Placeholder'
          width={500}
          height={500}
        />
      )}

      {/* Details */}
      <NFTDetails>
        <PrimaryDetails>
          <p>{nft ? nft.collection : 'None'}</p>
          <p>{nft ? nft.name : 'None'}</p>
        </PrimaryDetails>
        <SecondaryDetails>
          <div>
            <p>Price</p>
            <p>{nft && nft.offerPrice ? nft.offerPrice : '-'}</p>
          </div>
          <div>
            <p>Highest Bid</p>
            <p>{nft && nft.auction ? nft.auction.bestBid : 'None'}</p>
          </div>
        </SecondaryDetails>
      </NFTDetails>
    </StyledNFTCard>
  )
}

export default NFTCard

const StyledNFTCard = styled.div`
  background: var(--color-alabaster);
  border: 1px solid var(--color-mercury);
  border-radius: 10px;
  transition: 0.2s ease;

  img {
    border-radius: 10px;
  }

  :hover {
    border: 1px solid var(--color-black);
  }
`

const NFTDetails = styled.div`
  padding: 20px;
`

const PrimaryDetails = styled.div`
  p:last-child {
    color: var(--color-black);
    font-size: 18px;
    margin-top: 8px;
  }
`

const SecondaryDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 16px;

  p:last-child {
    color: var(--color-black);
    font-size: 18px;
    margin-top: 8px;
  }
`
