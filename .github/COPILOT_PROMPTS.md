# Copilot Prompt Library for Baynunah HR Portal

This document provides ready-to-use prompts for GitHub Copilot Chat that are tailored to this project.

## UAE Compliance Prompts

### Calculate Gratuity
```
@workspace Calculate the gratuity for an employee who joined on [date] with a basic salary of [amount] AED, following UAE Labor Law.
```

### Leave Entitlement
```
@workspace How many annual leave days is an employee entitled to if they joined on [date]? Consider UAE Labor Law pro-rata calculations.
```

### Overtime Calculation
```
@workspace Calculate overtime pay for [hours] hours worked on [weekday/weekend/night] with a basic salary of [amount] AED.
```

## Development Prompts

### Create API Route
```
@workspace Create a new Next.js API route in /app/api/[endpoint] that:
- Uses Zod for input validation
- Follows the project's response structure
- Includes proper error handling
- Uses Prisma for database operations
```

### Create Component
```
@workspace Create a React component for [description] that:
- Is mobile-first (44px minimum touch targets)
- Uses Tailwind CSS with the project's teal color scheme
- Follows the project's TypeScript conventions
- Is accessible
```

### Database Query
```
@workspace Write a Prisma query to [description] with proper error handling and TypeScript types.
```

## Code Review Prompts

### General Review
```
@workspace Review this code for:
- TypeScript best practices
- Security vulnerabilities
- Mobile-first design
- UAE Labor Law compliance (if applicable)
```

### Performance Review
```
@workspace Analyze this code for performance issues and suggest optimizations, keeping in mind this is a mobile-first PWA.
```

### Accessibility Review
```
@workspace Check this component for accessibility issues, ensuring touch targets are at least 44px and contrast ratios meet WCAG standards.
```

## Testing Prompts

### Unit Test
```
@workspace Generate Vitest unit tests for the function in [file] that cover:
- Happy path scenarios
- Edge cases
- Error handling
```

### Compliance Test
```
@workspace Generate tests for UAE Labor Law calculations that verify:
- Gratuity calculation (years 1-5 and 5+)
- Annual leave pro-rata
- Sick leave breakdown
- Overtime rates
```

## Debugging Prompts

### Error Analysis
```
@workspace I'm getting this error: [error message]. Help me understand what's wrong and how to fix it in the context of this Next.js/Prisma project.
```

### Type Error
```
@workspace This TypeScript error appears: [error]. Help me fix the types while maintaining strict TypeScript mode.
```

## Documentation Prompts

### API Documentation
```
@workspace Generate API documentation for the route in [file] including request/response examples and error codes.
```

### Component Documentation
```
@workspace Add JSDoc comments to the component in [file] following the project's documentation style.
```

## Architecture Prompts

### Feature Planning
```
@workspace I want to add a feature for [description]. Based on the project architecture in ARCHITECTURE.md, suggest how to implement this.
```

### Database Schema
```
@workspace Suggest Prisma schema changes to support [feature], following the existing schema patterns in prisma/schema.prisma.
```

## Tips for Effective Prompts

1. **Be Specific**: Include relevant context like file paths and specific requirements
2. **Reference Files**: Use `@workspace` to leverage the full project context
3. **Mention Standards**: Reference UAE Labor Law when dealing with compliance features
4. **Include Constraints**: Mention mobile-first, TypeScript strict mode, etc.
5. **Request Validation**: Ask Copilot to validate against existing patterns

## MCP Server Integration

When using MCP servers, you can enhance your prompts:

### GitHub Integration
```
@github Show me the recent issues and PRs for this repository
```

### Database Exploration
```
@postgres Show me the schema for the Employee table and recent records
```

### Fetch Documentation
```
@fetch Get the latest UAE Labor Law updates from [url]
```
