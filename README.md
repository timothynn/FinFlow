# 💰 FinFlow - Smart Personal Finance Tracker

A modern, feature-rich personal finance tracking application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 📊 **Interactive Dashboard** - Visual overview of your spending with charts and analytics
- 💳 **Expense Tracking** - Add, view, and delete expenses with categories
- 🎯 **Budget Management** - Set category budgets and receive alerts
- 📈 **Data Visualization** - Pie charts and bar graphs for spending insights
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 💾 **Local Storage** - Your data persists in the browser
- 📤 **Data Export** - Export your financial data as JSON

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Date Handling:** date-fns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/finflow.git
cd finflow
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure
finflow/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── Dashboard.tsx
│   │   ├── AddExpense.tsx
│   │   ├── BudgetManager.tsx
│   │   ├── ExpenseList.tsx
│   │   ├── Charts/       # Chart components
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   │   └── useFinance.ts
│   └── lib/              # Utility functions
│       ├── types.ts
│       ├── utils.ts
│       └── storage.ts

## Usage

### Adding Expenses
1. Click "Add Expense" tab
2. Enter amount, select category, add description
3. Choose date and optionally upload receipt
4. Click "Add Expense"

### Setting Budgets
1. Navigate to "Budgets" tab
2. Select category and enter budget limit
3. View progress bars for each budget
4. Get alerts when spending reaches 80%

### Viewing Analytics
- Dashboard shows total spending, budgets, and transaction count
- Pie chart breaks down spending by category
- Bar chart shows monthly spending trends
- Recent transactions list displays latest expenses

### Exporting Data
Click "Export" button on dashboard to download your financial data as JSON

## Building for Production
```bash
npm run build
npm start
```

## Deployment

Deploy to Vercel (recommended):
```bash
vercel
```

Or deploy to any platform that supports Next.js.

## Future Enhancements

- [ ] Backend API with database
- [ ] User authentication
- [ ] OCR for receipt scanning
- [ ] Recurring expenses
- [ ] Multiple currencies
- [ ] Budget recommendations using AI
- [ ] Expense splitting
- [ ] PDF/CSV export formats
- [ ] Dark mode

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your portfolio or personal use.

## Author

Built for software engineering interview preparation.

---

⭐ Star this repo if you find it helpful!
