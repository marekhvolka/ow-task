/// <reference types="cypress" />

const { _ } = Cypress
import { TitlesDetailHelper } from "../helpers/TitlesDetailHelper"
import { TitlesTableHelper } from "../helpers/TitlesTableHelper"

describe('titles table', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/titles')
  })

  it('navigate between pages with buttons', () => {
    cy.get(TitlesTableHelper.getNextPageButton()).click()
    
    cy.get(TitlesTableHelper.getPageIndex()).contains('Page 2')
    cy.location('href').should('include', 'page=2')

    cy.get(TitlesTableHelper.getNextPageButton()).click()
    cy.get(TitlesTableHelper.getPageIndex()).contains('Page 3')
    cy.location('href').should('include', 'page=3')

    cy.get(TitlesTableHelper.getPreviousPageButton()).click()

    cy.get(TitlesTableHelper.getPageIndex()).contains('Page 2')
    cy.location('href').should('include', 'page=2')

    cy.get(TitlesTableHelper.getPreviousPageButton()).click()

    cy.get(TitlesTableHelper.getPageIndex()).contains('Page 1')
    cy.location('href').should('include', 'page=1')

    cy.get(TitlesTableHelper.getPreviousPageButton()).should('be.disabled')
  })

  it('navigate between pages through url', () => {

    cy.visit('http://localhost:3000/titles?page=2')
    
    cy.get(TitlesTableHelper.getPageIndex()).contains('Page 2')
    cy.location('href').should('include', 'page=2')

    cy.visit('http://localhost:3000/titles?page=3')
    
    cy.get(TitlesTableHelper.getPageIndex()).contains('Page 3')
    cy.location('href').should('include', 'page=3')

    cy.visit('http://localhost:3000/titles?page=1')

    cy.get(TitlesTableHelper.getPageIndex()).contains('Page 1')
    cy.location('href').should('include', 'page=1')

    cy.get(TitlesTableHelper.getPreviousPageButton()).should('be.disabled')
  })

  it('reset to page 1, when sorting has changed', () => {
    cy.get(TitlesTableHelper.getNextPageButton()).click()
    
    cy.get(TitlesTableHelper.getPageIndex()).contains('Page 2')
    cy.location('href').should('include', 'page=2')
    cy.get(TitlesTableHelper.getFirstColumnHeader()).get(TitlesTableHelper.getSortIconAsc()).should('be.visible')

    cy.get(TitlesTableHelper.getFirstColumnHeader()).click()

    cy.get(TitlesTableHelper.getPageIndex()).contains('Page 1')
    cy.location('href').should('include', 'page=1')
  })

  it('sort by columns', () => {
    const toStrings = (cells$) => _.map(cells$, 'textContent');

    cy.get(TitlesTableHelper.getFirstColumnValues())
      .then(toStrings)
        .then((values) => {
          const sorted = _.orderBy(values, _.identity, 'asc');
          cy.log('sorted', sorted);
          cy.log('values', values);
          expect(values).to.deep.equal(sorted)
        })

    cy.get(TitlesTableHelper.getFirstColumnHeader()).get(TitlesTableHelper.getSortIconAsc()).should('be.visible')
    cy.get(TitlesTableHelper.getFirstColumnHeader()).click()
    
    cy.location('href').should('include', 'sortBy=titleNumber')
    cy.location('href').should('include', 'sortOrder=desc')
    cy.get(TitlesTableHelper.getFirstColumnHeader()).get(TitlesTableHelper.getSortIconDesc()).should('be.visible')

    cy.get(TitlesTableHelper.getFirstColumnValues())
      .then(toStrings)
        .then((values) => {
          const sorted = _.orderBy(values, _.identity, 'desc');
          cy.log('sorted', sorted);
          cy.log('values', values);
          expect(values).to.deep.equal(sorted)
        })

    cy.get(TitlesTableHelper.getSecondColumnHeader()).click()
    cy.get(TitlesTableHelper.getSecondColumnHeader()).get(TitlesTableHelper.getSortIconAsc()).should('be.visible')

    cy.location('href').should('include', 'sortBy=tenure')
    cy.location('href').should('include', 'sortOrder=asc')

    cy.get(TitlesTableHelper.getSecondColumnValues())
      .then(toStrings)
        .then((values) => {
          const sorted = _.orderBy(values, _.identity, 'asc');
          cy.log('sorted', sorted);
          cy.log('values', values);
          expect(values).to.deep.equal(sorted)
        })
  })

  it('navigate to title detail by clicking on table row', () => {
    cy.get(`${TitlesTableHelper.getNthRow(1)} td`).then(($td) => {
      const titleNumber = $td[0].textContent
      cy.get(TitlesTableHelper.getNthRow(1)).click()
      cy.location('href').should('include', `titles/${titleNumber}`)

      cy.get(TitlesDetailHelper.getHeading()).contains(titleNumber);
    });  
  })
})
