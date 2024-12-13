import ResultBox from './ResultBox';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('PLN 100.00 = $28.57');
    });

    const testCases = [
        { amount: 200, from: 'PLN', to: 'USD', expected: 'PLN 200.00 = $57.14' },
        { amount: 345, from: 'PLN', to: 'USD', expected: 'PLN 345.00 = $98.57' },
        { amount: 100, from: 'USD', to: 'PLN', expected: '$100.00 = PLN 350.00' },
        { amount: 50, from: 'USD', to: 'PLN', expected: '$50.00 = PLN 175.00' },
        { amount: 100, from: 'PLN', to: 'PLN', expected: 'PLN 100.00 = PLN 100.00' },
    ];

    for (const testObj of testCases) {
        it(`should render correct conversion for ${testObj.amount} ${testObj.from} to ${testObj.to}`, () => {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(testObj.expected);
        });
    }

    it('should render "Wrong value..." for negative amount', () => {
        render(<ResultBox from="PLN" to="USD" amount={-50} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('Wrong value...');
    });
});