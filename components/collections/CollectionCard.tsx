import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import CurrencyFormat from 'react-currency-format'

interface Props extends React.HTMLProps<HTMLDivElement> {
  image: string
  name: string
  total: number
  volume: number
  index: number
}

const CollectionCard = ({ image, name, total, volume, index }: Props) => {
  return (
    <Link href={`/collections/${name}`}>
      <a>
        <StyledCollectionCard key={index}>
          {/* Image */}
          <ImageContainer>
            {image ? (
              <Image
                src={image}
                alt={name}
                width={500}
                height={500}
                layout='responsive'
              />
            ) : null}
          </ImageContainer>

          {/* Details */}
          <CollectionDetails>
            <CollectionName>{name}</CollectionName>
            <SecondaryDetails>
              <div>
                <p>NFTs</p>
                <p>{total}</p>
              </div>
              <div>
                <p>Volume</p>
                <p>
                  {volume ? (
                    <CurrencyFormat
                      value={volume.toFixed()}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  ) : (
                    '-'
                  )}
                </p>
              </div>
            </SecondaryDetails>
          </CollectionDetails>
        </StyledCollectionCard>
      </a>
    </Link>
  )
}

export default CollectionCard

const StyledCollectionCard = styled.div`
  background: var(--color-alabaster);
  border: 1px solid var(--color-mercury);
  border-radius: 8px;
  height: 100%;
  transition: 0.2s ease;

  :hover {
    border: 1px solid var(--color-black);
    cursor: pointer;
  }
`

const ImageContainer = styled.div`
  img {
    border-radius: 10px;
  }
`

const CollectionDetails = styled.div`
  padding: 20px;
`

const CollectionName = styled.p`
  color: var(--color-black);
  font-size: 18px;
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
