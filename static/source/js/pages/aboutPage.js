import React, { Component } from 'react'
import { PageLayout, PageTitle } from '../shared/pageLayout'
import ArticleMarkdown from './articles/articleMarkdown'

const body = `
DbMaj7.com is a collection of resources and articles that aim to help musicians level up their knowledge and craftsmanship.

If this is your first time here, get started by brushing up on your mastery of chords and scales [here](/piano).

If you would like to send questions or feedback about the site, you can reach me on [twitter](https://twitter.com/DbMaj7DotCom).

I hope you enjoy the site!

-Adam Czerepinski
`

const AboutPage = () => (
  <PageLayout>
    <PageTitle>DbMaj7.com</PageTitle>
    <ArticleMarkdown body={body}/>
  </PageLayout>
)

export default AboutPage