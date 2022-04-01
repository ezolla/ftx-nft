import Image from 'next/image'
import styled from 'styled-components'
import CurrencyFormat from 'react-currency-format'

import { Discord, Twitter, Web } from 'components/Icons'
import { CollectionDetails } from '../../safety/interfaces'

interface Props extends React.HTMLProps<HTMLDivElement> {
  details: CollectionDetails
}

const DetailsHeader = ({ details }: Props) => {
  return (
    <StyledHeader>
      {/* Banner */}
      <BannerContainer>
        {details ? (
          <Image
            src={details.collectionDict.bannerImageUrl}
            alt={details.collectionDict.displayName}
            width={1512}
            height={220}
            layout='responsive'
          />
        ) : null}
      </BannerContainer>

      {/* Details */}
      <CollectionDetails>
        {/* Logo */}
        <LogoContainer>
          {details ? (
            <Image
              src={details.collectionDict.avatarImageUrl}
              alt={details.collectionDict.displayName}
              width={150}
              height={150}
            />
          ) : null}
        </LogoContainer>

        {/* Title & Description */}
        <TextContainer>
          <h1>{details ? details.collectionDict.displayName : 'None'}</h1>
          {details && details.collectionDict.description ? (
            <p>{details.collectionDict.description}</p>
          ) : null}
        </TextContainer>

        {/* Socials */}
        <SocialContainer>
          {/* Twitter */}
          {details && details.collectionDict.twitterUrl ? (
            <a href={details.collectionDict.twitterUrl} target='_blank'>
              <Twitter />
            </a>
          ) : null}

          {/* Discord */}
          {details && details.collectionDict.discordUrl ? (
            <a href={details.collectionDict.discordUrl} target='_blank'>
              <Discord />
            </a>
          ) : null}

          {/* Website */}
          {details && details.collectionDict.homepageUrl ? (
            <a href={details.collectionDict.homepageUrl} target='_blank'>
              <Web />
            </a>
          ) : null}
        </SocialContainer>

        {/* Analytics */}
        <AnalyticsContainer>
          <div>
            <p>NFTs</p>
            <p>{details && details.total ? details.total : '-'}</p>
          </div>
          <div>
            <p>Floor</p>
            <p>{details && details.floor_price ? details.floor_price : '-'}</p>
          </div>
          <div>
            <p>Volume</p>
            <p>
              {details && details.volume ? (
                <CurrencyFormat
                  value={details.volume.toFixed()}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              ) : (
                '-'
              )}
            </p>
          </div>
          <div>
            <p>Open Auctions</p>
            <p>{details ? details.open_auctions : '-'}</p>
          </div>
        </AnalyticsContainer>
      </CollectionDetails>
    </StyledHeader>
  )
}

export default DetailsHeader

const StyledHeader = styled.header`
  border-bottom: 1px solid var(--color-mercury);
  padding-bottom: 64px;
`

const BannerContainer = styled.div``

const LogoContainer = styled.div`
  img {
    border-radius: 100%;
  }
`

const CollectionDetails = styled.div`
  max-width: 600px;
  margin: -80px auto 0;
  text-align: center;
`

const TextContainer = styled.div`
  h1 {
    margin-top: 16px;
  }

  p {
    max-width: 400px;
    margin: 16px auto 0;
  }
`

const SocialContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;

  a {
    border: 1px solid var(--color-mercury);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    transition: 0.2s ease;

    path {
      transition: 0.2s ease;
    }

    :not(:last-child) {
      margin-right: 10px;
    }

    :hover {
      background: var(--color-alabaster);

      path {
        fill: var(--color-black);
      }
    }
  }
`

const AnalyticsContainer = styled.div`
  border: 1px solid var(--color-mercury);
  border-radius: 10px;
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  div {
    padding: 20px;
    text-align: left;

    p:last-child {
      color: var(--color-black);
      font-size: 18px;
      font-weight: 500;
      margin-top: 8px;
    }

    :not(:last-child) {
      border-right: 1px solid var(--color-mercury);
    }
  }
`
