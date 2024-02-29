import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { TableLayout, type TableColumn } from '../components/Table'

type Person = {
  name: string;
  age: number;
}

describe('Table', () => {
  beforeEach(() => {
    const columns: TableColumn<Person>[] = [
      {
        key: 'name',
        title: 'Name',
      },
      {
        key: 'age',
        title: 'Age',
      },
    ];

    const data = [
      {
        name: 'John Doe',
        age: 25,
      },
      {
        name: 'Jane Doe',
        age: 22,
      },
    ];

    render(
      <TableLayout
        columns={columns}
        rows={data}
        onSort={() => { console.log("sorting") }}
        currentSortBy={"name"}
        defaultSortBy={"name"}
        currentSortOrder={"asc"}
        defaultSortOrder={"asc"}
      />
    )
  });

  it('renders column names correctly', () => {
    const nameHeading = screen.queryByText('Name')
    const ageHeading = screen.queryByText('Age')
    const addressHeading = screen.queryByText('Address')
 
    expect(nameHeading).toBeInTheDocument();
    expect(ageHeading).toBeInTheDocument();
    expect(addressHeading).not.toBeInTheDocument();
  });

  it('renders rows correctly', () => {
    const firstPerson = screen.queryByText('John Doe')
    const secondPerson = screen.queryByText('Jane Doe')
    const thirdPerson = screen.queryByText('Robin Hood')
 
    expect(firstPerson).toBeInTheDocument();
    expect(secondPerson).toBeInTheDocument();
    expect(thirdPerson).not.toBeInTheDocument();
  });
})