import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Sidebar } from '@/components/sidebar/sidebar';
import { Transaction } from '@/types';
import { DragDropContext } from 'react-beautiful-dnd';

const timestamp = new Date('April 10, 2020 01:15:00').getTime();

const mockTransactions: Transaction[] = [
  {
    id: '1',
    company: 'Test Company 1',
    balance: 1000,
    description: 'Test transaction 1',
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: '2',
    company: 'Test Company 2',
    balance: 2000,
    description: 'Test transaction 2',
    createdAt: timestamp,
    updatedAt: timestamp,
  },
];

describe('Sidebar', () => {
  it('renders the transactions list', () => {
    render(
      <DragDropContext onDragEnd={() => {}}>
        {' '}
        <Sidebar open={true} transactions={mockTransactions} onClose={() => {}}>
          <div>Test</div>
        </Sidebar>
      </DragDropContext>,
    );

    expect(screen.getByText('Test Company 1')).toBeDefined();
    expect(screen.getByText('Test transaction 1')).toBeDefined();
    expect(screen.getAllByText('04/10/2020')).toBeDefined();
    expect(screen.getByText('Test Company 2')).toBeDefined();
    expect(screen.getByText('$2000.00')).toBeDefined();
    expect(screen.getByText('Test transaction 2')).toBeDefined();
  });

  it('displays a message when there are no transactions', async () => {
    render(
      <DragDropContext onDragEnd={() => {}}>
        {' '}
        <Sidebar open={true} transactions={[]} onClose={() => {}}>
          <div>Test</div>
        </Sidebar>
      </DragDropContext>,
    );

    await waitFor(() => {
      expect(screen.getByText('No more transactions')).toBeDefined();
    });
  });
});
