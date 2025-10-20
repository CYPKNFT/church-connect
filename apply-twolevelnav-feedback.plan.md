# Apply TwoLevelNav to Feedback Pages

## Overview

Replace the current layout wrappers with TwoLevelNav for all Feedback section pages. Each page will show the same two-level navigation with "Feedback" selected in the primary message bubble menu, but with different sub-items highlighted.

## Current Structure Analysis

### Routes in App.tsx (lines 105-107):

```typescript
<Route path="/feedback" element={<Feedback />} />
<Route path="/feedback/app" element={<FeedbackApp />} />
<Route path="/feedback/church" element={<FeedbackChurch />} />
```

### Current Wrapping Pattern:

- **No AdminLayout wrappers** - routes render components directly
- Each page component may have its own layout wrapper internally
- Need to check each page for existing layout components

### Feedback Pages:

1. **Feedback.tsx** - Need to check current layout wrapper
2. **FeedbackApp.tsx** - Need to check current layout wrapper  
3. **FeedbackChurch.tsx** - Need to check current layout wrapper

## Critical Implementation Strategy

**To avoid double-panel rendering**, we will:

1. Add TwoLevelNav wrapper directly in each page component
2. Remove any existing layout wrappers from pages
3. This matches the pattern used for Admin, Serving, and Giving pages

## Implementation Steps

### Step 1: Check Current Page Structures

**Files to examine:**
- `src/pages/Feedback.tsx`
- `src/pages/FeedbackApp.tsx` 
- `src/pages/FeedbackChurch.tsx`

**Action:** Check each file for existing layout wrappers (DashboardLayout, CollapsibleSidebar, etc.)

### Step 2: Update Feedback.tsx

**File:** `src/pages/Feedback.tsx`

**Add Import (top of file):**

```typescript
import { TwoLevelNav } from "@/components/TwoLevelNav";
```

**Find the return statement** (search for `return (` in the component)

**Wrap content with:**

```typescript
return (
  <TwoLevelNav activeMenuId="feedback" activeSubItemPath="/feedback">
    {/* existing content */}
  </TwoLevelNav>
);
```

### Step 3: Update FeedbackApp.tsx

**File:** `src/pages/FeedbackApp.tsx`

**Add Import (top of file):**

```typescript
import { TwoLevelNav } from "@/components/TwoLevelNav";
```

**Find the return statement** (search for `return (` in the component)

**Wrap content with:**

```typescript
return (
  <TwoLevelNav activeMenuId="feedback" activeSubItemPath="/feedback/app">
    {/* existing content */}
  </TwoLevelNav>
);
```

### Step 4: Update FeedbackChurch.tsx

**File:** `src/pages/FeedbackChurch.tsx`

**Add Import (top of file):**

```typescript
import { TwoLevelNav } from "@/components/TwoLevelNav";
```

**Find the return statement** (search for `return (` in the component)

**Wrap content with:**

```typescript
return (
  <TwoLevelNav activeMenuId="feedback" activeSubItemPath="/feedback/church">
    {/* existing content */}
  </TwoLevelNav>
);
```

## Verification Checklist

After implementation, verify:

1. ✅ Each feedback page imports TwoLevelNav
2. ✅ Each feedback page wraps its content with TwoLevelNav
3. ✅ activeMenuId is set to "feedback" for all feedback pages
4. ✅ activeSubItemPath matches the route path for each page
5. ✅ Only ONE navigation panel renders (TwoLevelNav)
6. ✅ No double-rendering of sidebars
7. ✅ Build completes successfully with no errors

## Expected TwoLevelNav Menu Mappings

From `src/components/TwoLevelNav.tsx` (lines 78-86):

```typescript
{
  id: "feedback",
  label: "Feedback",
  icon: MessageSquare,
  subItems: [
    { label: "Feedback", icon: MessageSquare, path: "/feedback" },
    { label: "App Feedback", icon: Smartphone, path: "/feedback/app" },
    { label: "Church Feedback", icon: Church, path: "/feedback/church" },
  ],
}
```

**Note:** The feedback menu already has all three sub-items configured correctly.

## Result

All three feedback pages will have:

- Same two-level navigation menu on the left
- "Feedback" tab (primary message bubble icon) always selected in first panel
- Appropriate sub-item highlighted in second panel based on current page:
  - `/feedback` → "Feedback" highlighted
  - `/feedback/app` → "App Feedback" highlighted
  - `/feedback/church` → "Church Feedback" highlighted
- Functional navigation between feedback pages
- Page content displayed in main content area
- **NO double-panel rendering** - only TwoLevelNav

## Implementation Order

1. Check current page structures for existing layout wrappers
2. Update Feedback.tsx to use TwoLevelNav
3. Update FeedbackApp.tsx to use TwoLevelNav
4. Update FeedbackChurch.tsx to use TwoLevelNav
5. Verify all changes work correctly and build succeeds

This follows the exact same pattern as the Admin, Serving, and Giving pages implementations.
