import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { PageLayout, PageTitle } from '../../shared/pageLayout'
import { LinkWrapper, Summary, SummaryWrapper } from '../../shared/indexStyles'

const ResourceIndexPage = () => (
  <PageLayout>
    <PageTitle>Resources</PageTitle>
      <SummaryWrapper>
        <LinkWrapper>
          <Link to={'/resources/piano'}>Chord & Scale Visualizer</Link>
        </LinkWrapper>
        <Summary>
          Master chords and scales by seeing, hearing, and tasting them (tasting not currently supported in all browsers)
        </Summary>
      </SummaryWrapper>
  </PageLayout>
)

export default ResourceIndexPage