import { Level } from './types'

export const levels: Level[] = [
  // LEVEL 1: The Broken SUM
  {
    id: 1,
    title: 'The Broken SUM',
    type: 'formula-fixer',
    difficulty: 'beginner',
    parTime: 30,
    story: "It's Monday morning. Your coworker Karen left for a 2-week cruise and her Q3 expense report is due TODAY. The totals aren't adding up...",
    grid: [
      [
        { value: 'Expense', type: 'locked' },
        { value: 'Amount', type: 'locked' },
      ],
      [
        { value: 'Office Supplies', type: 'locked' },
        { value: '234', type: 'locked' },
      ],
      [
        { value: 'Travel', type: 'locked' },
        { value: '456', type: 'locked' },
      ],
      [
        { value: 'Software', type: 'locked' },
        { value: '189', type: 'locked' },
      ],
      [
        { value: 'Training', type: 'locked' },
        { value: '105', type: 'locked' },
      ],
      [
        { value: 'Total', type: 'locked' },
        { value: '', type: 'input' },
      ],
    ],
    solution: {
      B6: '984',
    },
    hints: [
      'The formula is only adding some of the cells...',
      'You need to include ALL expense amounts (B2 through B5)',
      'The total should be 234 + 456 + 189 + 105 = 984',
    ],
  },

  // LEVEL 2: Pattern Recognition
  {
    id: 2,
    title: 'Pattern Recognition',
    type: 'pattern-detective',
    difficulty: 'beginner',
    parTime: 45,
    story: 'The new intern was auto-filling a sequence but got interrupted by a fire drill.',
    grid: [
      [
        { value: 'Sequence', type: 'locked' },
      ],
      [
        { value: '2', type: 'locked' },
      ],
      [
        { value: '4', type: 'locked' },
      ],
      [
        { value: '8', type: 'locked' },
      ],
      [
        { value: '16', type: 'locked' },
      ],
      [
        { value: '', type: 'input' },
      ],
      [
        { value: '', type: 'input' },
      ],
    ],
    solution: {
      A6: '32',
      A7: '64',
    },
    hints: [
      'Look at how each value relates to the one before it',
      'Each value is being multiplied by the same number',
      "It's doubling! Each value is 2× the previous",
    ],
  },

  // LEVEL 3: Reference Runabout
  {
    id: 3,
    title: 'Reference Runabout',
    type: 'reference-maze',
    difficulty: 'beginner',
    parTime: 60,
    story: "Someone thought it would be 'clever' to chain cell references across the sheet.",
    grid: [
      [
        { value: '', type: 'locked' },
        { value: 'A', type: 'locked' },
        { value: 'B', type: 'locked' },
        { value: 'C', type: 'locked' },
      ],
      [
        { value: '1', type: 'locked' },
        { value: '10', type: 'locked' },
        { value: '=A1*2', type: 'locked', formula: '=A1*2', displayFormula: true },
        { value: '=B1+5', type: 'locked', formula: '=B1+5', displayFormula: true },
      ],
      [
        { value: '2', type: 'locked' },
        { value: '=C1', type: 'locked', formula: '=C1', displayFormula: true },
        { value: '=A2-10', type: 'locked', formula: '=A2-10', displayFormula: true },
        { value: '', type: 'input' },
      ],
    ],
    solution: {
      D3: '45',
    },
    hints: [
      'Start with A1 (10) and follow each reference step by step',
      'A1=10 → B1=20 → C1=25 → A2=25 → B2=15 → C2=?',
      'C2 = B2 * 3 = 15 * 3 = 45',
    ],
  },

  // LEVEL 4: The Missing VLOOKUP
  {
    id: 4,
    title: 'The Missing VLOOKUP',
    type: 'vlookup-challenge',
    difficulty: 'beginner+',
    parTime: 90,
    story: 'HR needs to match employee IDs to their departments.',
    grid: [
      [
        { value: 'ID', type: 'locked' },
        { value: 'Name', type: 'locked' },
        { value: 'Dept', type: 'locked' },
      ],
      [
        { value: '101', type: 'locked' },
        { value: 'Alice', type: 'locked' },
        { value: 'Engineering', type: 'locked' },
      ],
      [
        { value: '102', type: 'locked' },
        { value: 'Bob', type: 'locked' },
        { value: 'Sales', type: 'locked' },
      ],
      [
        { value: '103', type: 'locked' },
        { value: 'Carol', type: 'locked' },
        { value: 'Marketing', type: 'locked' },
      ],
      [
        { value: '104', type: 'locked' },
        { value: 'Dave', type: 'locked' },
        { value: 'Engineering', type: 'locked' },
      ],
      [
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'Lookup ID:', type: 'locked' },
        { value: '103', type: 'locked' },
        { value: '', type: 'input' },
      ],
    ],
    solution: {
      C7: 'Marketing',
    },
    hints: [
      'VLOOKUP searches the first column of a range for a value',
      'Syntax: =VLOOKUP(lookup_value, table_range, column_number, FALSE)',
      'Look up 103 in A2:C5, return column 3 (Dept)',
    ],
  },

  // LEVEL 5: Conditional Chaos
  {
    id: 5,
    title: 'Conditional Chaos',
    type: 'conditional-logic',
    difficulty: 'beginner+',
    parTime: 45,
    story: 'The boss wants cells highlighted based on performance: Green ≥90, Yellow 70-89, Red <70.',
    grid: [
      [
        { value: 'Name', type: 'locked' },
        { value: 'Score', type: 'locked' },
        { value: 'Color', type: 'locked' },
      ],
      [
        { value: 'Alice', type: 'locked' },
        { value: '95', type: 'locked' },
        { value: 'Green', type: 'locked' },
      ],
      [
        { value: 'Bob', type: 'locked' },
        { value: '65', type: 'locked' },
        { value: 'Red', type: 'locked' },
      ],
      [
        { value: 'Carol', type: 'locked' },
        { value: '85', type: 'locked' },
        { value: '', type: 'input' },
      ],
      [
        { value: 'Dave', type: 'locked' },
        { value: '72', type: 'locked' },
        { value: 'Yellow', type: 'locked' },
      ],
    ],
    solution: {
      C4: 'Yellow',
    },
    hints: [
      'Look at the rules: Green ≥90, Yellow 70-89, Red <70',
      "What is the value in Carol's cell? It's 85.",
      '85 falls in the 70-89 range = Yellow',
    ],
  },

  // LEVEL 6: INDEX/MATCH Inception
  {
    id: 6,
    title: 'INDEX/MATCH Inception',
    type: 'formula-fixer',
    difficulty: 'intermediate',
    parTime: 120,
    story: "The finance team refuses to use VLOOKUP because 'it's for amateurs.' Their INDEX/MATCH is returning #N/A.",
    grid: [
      [
        { value: '', type: 'locked' },
        { value: 'Bronze', type: 'locked' },
        { value: 'Silver', type: 'locked' },
        { value: 'Gold', type: 'locked' },
      ],
      [
        { value: 'North', type: 'locked' },
        { value: '5%', type: 'locked' },
        { value: '7%', type: 'locked' },
        { value: '9%', type: 'locked' },
      ],
      [
        { value: 'South', type: 'locked' },
        { value: '4%', type: 'locked' },
        { value: '6%', type: 'locked' },
        { value: '8%', type: 'locked' },
      ],
      [
        { value: 'West', type: 'locked' },
        { value: '6%', type: 'locked' },
        { value: '8%', type: 'locked' },
        { value: '10%', type: 'locked' },
      ],
      [
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'Region: West', type: 'locked' },
        { value: 'Tier: Gold', type: 'locked' },
        { value: 'Rate:', type: 'locked' },
        { value: '', type: 'input' },
      ],
    ],
    solution: {
      D6: '10%',
    },
    hints: [
      'The INDEX range and MATCH ranges need to align. Is the column MATCH looking in the right place?',
      'Find West row and Gold column in the table',
      'West row is row 4, Gold column is D. The intersection is 10%',
    ],
  },

  // LEVEL 7: The Nested Nightmare
  {
    id: 7,
    title: 'The Nested Nightmare',
    type: 'formula-fixer',
    difficulty: 'intermediate',
    parTime: 90,
    story: 'Someone wrote a grading formula with 5 nested IFs. It returns "ERROR" for score 58.',
    grid: [
      [
        { value: 'Score', type: 'locked' },
        { value: 'Grade', type: 'locked' },
      ],
      [
        { value: '92', type: 'locked' },
        { value: 'A', type: 'locked' },
      ],
      [
        { value: '85', type: 'locked' },
        { value: 'B', type: 'locked' },
      ],
      [
        { value: '73', type: 'locked' },
        { value: 'C', type: 'locked' },
      ],
      [
        { value: '65', type: 'locked' },
        { value: 'D', type: 'locked' },
      ],
      [
        { value: '58', type: 'locked' },
        { value: '', type: 'input' },
      ],
    ],
    solution: {
      B6: 'F',
    },
    hints: [
      'Walk through the IF logic: >=90=A, >=80=B, >=70=C, >=60=D... what about below 60?',
      'The formula returns "ERROR" when score is below 60 — but that should be a grade',
      'Score 58 is below 60, so correct answer is F',
    ],
  },

  // LEVEL 8: The SUMPRODUCT Saga
  {
    id: 8,
    title: 'The SUMPRODUCT Saga',
    type: 'formula-fixer',
    difficulty: 'intermediate',
    parTime: 120,
    story: "Marketing wants total sales for 'Widget' in 'West' region. Time for SUMPRODUCT wizardry.",
    grid: [
      [
        { value: 'Product', type: 'locked' },
        { value: 'Region', type: 'locked' },
        { value: 'Sales', type: 'locked' },
      ],
      [
        { value: 'Widget', type: 'locked' },
        { value: 'West', type: 'locked' },
        { value: '1500', type: 'locked' },
      ],
      [
        { value: 'Gadget', type: 'locked' },
        { value: 'East', type: 'locked' },
        { value: '2000', type: 'locked' },
      ],
      [
        { value: 'Widget', type: 'locked' },
        { value: 'East', type: 'locked' },
        { value: '1800', type: 'locked' },
      ],
      [
        { value: 'Widget', type: 'locked' },
        { value: 'West', type: 'locked' },
        { value: '2200', type: 'locked' },
      ],
      [
        { value: 'Gadget', type: 'locked' },
        { value: 'West', type: 'locked' },
        { value: '1700', type: 'locked' },
      ],
      [
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'Widget + West =', type: 'locked' },
        { value: '', type: 'input' },
        { value: '', type: 'locked' },
      ],
    ],
    solution: {
      B8: '3700',
    },
    hints: [
      'SUMPRODUCT multiplies arrays and sums. Boolean TRUE=1, FALSE=0',
      'Formula: =SUMPRODUCT((condition1)*(condition2)*(values))',
      'Widget+West rows have sales 1500 and 2200. Sum = 3700',
    ],
  },

  // LEVEL 9: Reverse Engineer This
  {
    id: 9,
    title: 'Reverse Engineer This',
    type: 'reverse-engineering',
    difficulty: 'advanced',
    parTime: 180,
    story: 'The consultant left no documentation. You have inputs and outputs but the formula is corrupted.',
    grid: [
      [
        { value: 'A', type: 'locked' },
        { value: 'B', type: 'locked' },
        { value: 'Result', type: 'locked' },
      ],
      [
        { value: '10', type: 'locked' },
        { value: '5', type: 'locked' },
        { value: '25', type: 'locked' },
      ],
      [
        { value: '8', type: 'locked' },
        { value: '3', type: 'locked' },
        { value: '19', type: 'locked' },
      ],
      [
        { value: '15', type: 'locked' },
        { value: '7', type: 'locked' },
        { value: '37', type: 'locked' },
      ],
      [
        { value: '20', type: 'locked' },
        { value: '10', type: 'locked' },
        { value: '50', type: 'locked' },
      ],
      [
        { value: '6', type: 'locked' },
        { value: '4', type: 'locked' },
        { value: '16', type: 'locked' },
      ],
      [
        { value: '12', type: 'locked' },
        { value: '8', type: 'locked' },
        { value: '', type: 'input' },
      ],
    ],
    solution: {
      C7: '32',
    },
    hints: [
      'Test basic operations on each row. A+B? A*B? Something with both?',
      "Try A*2: 20, 16, 30, 40, 12 — compare to C. What's the difference?",
      'Formula is 2*A + B. Test: 2*12 + 8 = 32',
    ],
  },

  // LEVEL 10: The Error Detective
  {
    id: 10,
    title: 'The Error Detective',
    type: 'reference-maze',
    difficulty: 'advanced',
    parTime: 150,
    story: 'The entire financial model shows #REF! errors cascading. Find Patient Zero.',
    grid: [
      [
        { value: '', type: 'locked' },
        { value: 'A', type: 'locked' },
        { value: 'B', type: 'locked' },
        { value: 'C', type: 'locked' },
      ],
      [
        { value: '1', type: 'locked' },
        { value: '100', type: 'locked' },
        { value: '#REF!', type: 'error' },
        { value: '#REF!', type: 'error' },
      ],
      [
        { value: '2', type: 'locked' },
        { value: '#REF!', type: 'error' },
        { value: '#REF!', type: 'error' },
        { value: '#REF!', type: 'error' },
      ],
      [
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'Patient Zero:', type: 'locked' },
        { value: '', type: 'input' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
      ],
    ],
    solution: {
      B5: 'B1',
    },
    hints: [
      "Trace backwards. Which #REF! doesn't depend on another error cell?",
      'C1→B1, D1→C1, A2→B1, B2→C1... they all trace back to one cell',
      'B1 contains =Z99 — reference to non-existent cell. B1 is Patient Zero.',
    ],
  },

  // LEVEL 11: Formula Golf
  {
    id: 11,
    title: 'Formula Golf',
    type: 'formula-fixer',
    difficulty: 'advanced',
    parTime: 120,
    story: "The intern's formula is 127 characters. Same output, fewer characters.",
    grid: [
      [
        { value: 'Age', type: 'locked' },
        { value: 'Score', type: 'locked' },
        { value: 'Status', type: 'locked' },
        { value: 'Eligible?', type: 'locked' },
      ],
      [
        { value: '25', type: 'locked' },
        { value: '85', type: 'locked' },
        { value: 'Active', type: 'locked' },
        { value: 'Yes', type: 'locked' },
      ],
      [
        { value: '17', type: 'locked' },
        { value: '90', type: 'locked' },
        { value: 'Active', type: 'locked' },
        { value: 'No', type: 'locked' },
      ],
      [
        { value: '30', type: 'locked' },
        { value: '65', type: 'locked' },
        { value: 'Active', type: 'locked' },
        { value: 'No', type: 'locked' },
      ],
      [
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'Optimal chars:', type: 'locked' },
        { value: '', type: 'input' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
      ],
    ],
    solution: {
      B6: '43',
    },
    hints: [
      "The IF(OR(...)) part is redundant. If AND is false, what's the only possibility?",
      'Simplify to: =IF(AND(conditions),"Yes","No")',
      'Optimized formula is 43 characters',
    ],
  },

  // LEVEL 12: The LET Labyrinth
  {
    id: 12,
    title: 'The LET Labyrinth',
    type: 'reference-maze',
    difficulty: 'expert',
    parTime: 90,
    story: 'Someone discovered LET and went wild. Trace the variables.',
    grid: [
      [
        { value: 'A1', type: 'locked' },
        { value: 'B1', type: 'locked' },
        { value: 'C1', type: 'locked' },
      ],
      [
        { value: '10', type: 'locked' },
        { value: '5', type: 'locked' },
        { value: '3', type: 'locked' },
      ],
      [
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'x = A1*2', type: 'locked' },
        { value: '=', type: 'locked' },
        { value: '20', type: 'locked' },
      ],
      [
        { value: 'y = x+B1', type: 'locked' },
        { value: '=', type: 'locked' },
        { value: '25', type: 'locked' },
      ],
      [
        { value: 'z = y*C1', type: 'locked' },
        { value: '=', type: 'locked' },
        { value: '75', type: 'locked' },
      ],
      [
        { value: 'z-x+y =', type: 'locked' },
        { value: '', type: 'input' },
        { value: '', type: 'locked' },
      ],
    ],
    solution: {
      B7: '80',
    },
    hints: [
      'Work through each variable. Start with x = A1*2 = ?',
      'x=20, y=25, z=75. Now calculate z-x+y',
      '75 - 20 + 25 = 80',
    ],
  },

  // LEVEL 13: Dynamic Array Dynamics
  {
    id: 13,
    title: 'Dynamic Array Dynamics',
    type: 'formula-fixer',
    difficulty: 'expert',
    parTime: 120,
    story: 'Predict what this FILTER/SORT combo returns.',
    grid: [
      [
        { value: 'Name', type: 'locked' },
        { value: 'Dept', type: 'locked' },
        { value: 'Sales', type: 'locked' },
      ],
      [
        { value: 'Alice', type: 'locked' },
        { value: 'Sales', type: 'locked' },
        { value: '50000', type: 'locked' },
      ],
      [
        { value: 'Bob', type: 'locked' },
        { value: 'Ops', type: 'locked' },
        { value: '35000', type: 'locked' },
      ],
      [
        { value: 'Carol', type: 'locked' },
        { value: 'Sales', type: 'locked' },
        { value: '75000', type: 'locked' },
      ],
      [
        { value: 'Dave', type: 'locked' },
        { value: 'Sales', type: 'locked' },
        { value: '45000', type: 'locked' },
      ],
      [
        { value: 'Eve', type: 'locked' },
        { value: 'Ops', type: 'locked' },
        { value: '55000', type: 'locked' },
      ],
      [
        { value: 'Frank', type: 'locked' },
        { value: 'Sales', type: 'locked' },
        { value: '80000', type: 'locked' },
      ],
      [
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'SORT(FILTER(...,"Sales"),3,-1)', type: 'locked' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'First name:', type: 'locked' },
        { value: '', type: 'input' },
        { value: '', type: 'locked' },
      ],
    ],
    solution: {
      B10: 'Frank',
    },
    hints: [
      'FILTER returns only Sales dept rows. How many?',
      '4 Sales people. SORT orders by column 3 descending (-1)',
      'Sorted: Frank(80k), Carol(75k), Alice(50k), Dave(45k). First = Frank',
    ],
  },

  // LEVEL 14: The Circular Conundrum (BOSS)
  {
    id: 14,
    title: 'The Circular Conundrum',
    type: 'reference-maze',
    difficulty: 'expert+',
    parTime: 180,
    story: 'BOSS LEVEL: Intentional circular reference with iterative calculation enabled.',
    grid: [
      [
        { value: 'A1 = (A1 + B1) / 2', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'B1 = 100', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'Initial A1 = 0', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'Iteration 1: A1 =', type: 'locked' },
        { value: '50', type: 'locked' },
      ],
      [
        { value: 'Iteration 2: A1 =', type: 'locked' },
        { value: '75', type: 'locked' },
      ],
      [
        { value: 'Iteration 3: A1 =', type: 'locked' },
        { value: '87.5', type: 'locked' },
      ],
      [
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'A1 converges to:', type: 'locked' },
        { value: '', type: 'input' },
      ],
    ],
    solution: {
      B9: '100',
    },
    hints: [
      "Each iteration: A1 moves halfway toward 100. What's the limit?",
      'Sequence: 0 → 50 → 75 → 87.5 → 93.75... approaching what?',
      "Zeno's paradox! A1 converges to B1 = 100",
    ],
  },

  // LEVEL 15: The Final Audit (FINAL BOSS)
  {
    id: 15,
    title: 'The Final Audit',
    type: 'formula-fixer',
    difficulty: 'expert+',
    parTime: 240,
    story: 'FINAL BOSS: Auditor found $0.01 discrepancy compounding across 10,000 transactions. Find the floating-point bug.',
    grid: [
      [
        { value: 'Item', type: 'locked' },
        { value: 'Calc', type: 'locked' },
        { value: 'Value', type: 'locked' },
      ],
      [
        { value: 'Subtotal', type: 'locked' },
        { value: 'A1', type: 'locked' },
        { value: '$59.97', type: 'locked' },
      ],
      [
        { value: 'Tax (8.25%)', type: 'locked' },
        { value: 'A1 × 0.0825', type: 'locked' },
        { value: '$4.95', type: 'locked' },
      ],
      [
        { value: 'Shipping', type: 'locked' },
        { value: 'A3', type: 'locked' },
        { value: '$5.99', type: 'locked' },
      ],
      [
        { value: 'Total', type: 'locked' },
        { value: 'A1+A2+A3', type: 'locked' },
        { value: '$70.91', type: 'locked' },
      ],
      [
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'Actual Tax:', type: 'locked' },
        { value: '4.947525', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'Displayed:', type: 'locked' },
        { value: '4.95', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
        { value: '', type: 'locked' },
      ],
      [
        { value: 'Bug cell (e.g. B2):', type: 'locked' },
        { value: '', type: 'input' },
        { value: '', type: 'locked' },
      ],
    ],
    solution: {
      B10: 'B2',
    },
    hints: [
      'Floating point errors occur with decimal multiplication. Which cell?',
      'Tax: $59.97 × 8.25% involves 0.0825 — notorious for precision issues',
      "B2 multiplies by 0.0825. In binary, this can't be represented exactly.",
    ],
  },
]
