# Apply TwoLevelNav to Giving Pages

## Overview

Replace the current layout wrappers with TwoLevelNav for all Giving section pages. Each page will show the same two-level navigation with "Giving" selected in the primary gift menu, but with different sub-items highlighted.

## Current Structure Analysis

### Routes in App.tsx (lines 137-141):

```typescript
<Route path="/marketplace" element={<Marketplace />} />
<Route path="/marketplace-item/:id" element={<MarketplaceItemDetails />} />
<Route path="/my-dashboard" element={<MyDashboard />} />
<Route path="/giving" element={<Giving />} />
<Route path="/received" element={<Received />} />
<Route path="/watchlist" element={<Watchlist />} />
```

### Current Wrapping Pattern:

- **No AdminLayout wrappers** - routes render components directly
- Each page component may have its own layout wrapper internally
- Need to check each page for existing layout components

### Giving Pages:

1. **Giving.tsx** - Need to check current layout wrapper
2. **Received.tsx** - Need to check current layout wrapper  
3. **Watchlist.tsx** - Need to check current layout wrapper
4. **Marketplace.tsx** (Browse.tsx) - Already uses TwoLevelNav
5. **MarketplaceItemDetails.tsx** - Need to check current layout wrapper
6. **MyDashboard.tsx** - Need to check current layout wrapper

## Critical Implementation Strategy

**To avoid double-panel rendering**, we will:

1. Add TwoLevelNav wrapper directly in each page component
2. Remove any existing layout wrappers from pages
3. This matches the pattern used for Admin and Serving pages

## Implementation Steps

### Step 1: Check Current Page Structures

**Files to examine:**
- `src/pages/Giving.tsx`
- `src/pages/Received.tsx` 
- `src/pages/Watchlist.tsx`
- `src/pages/MarketplaceItemDetails.tsx`
- `src/pages/MyDashboard.tsx`

**Action:** Check each file for existing layout wrappers (DashboardLayout, CollapsibleSidebar, etc.)

### Step 2: Update Giving.tsx

**File:** `src/pages/Giving.tsx`

**Add Import (top of file):**

```typescript
import { TwoLevelNav } from "@/components/TwoLevelNav";
```

**Find the return statement** (search for `return (` in the component)

**Wrap content with:**

```typescript
return (
  <TwoLevelNav activeMenuId="giving" activeSubItemPath="/giving">
    {/* existing content */}
  </TwoLevelNav>
);
```

### Step 3: Update Received.tsx

**File:** `src/pages/Received.tsx`

**Add Import (top of file):**

```typescript
import { TwoLevelNav } from "@/components/TwoLevelNav";
```

**Find the return statement** (search for `return (` in the component)

**Wrap content with:**

```typescript
return (
  <TwoLevelNav activeMenuId="giving" activeSubItemPath="/received">
    {/* existing content */}
  </TwoLevelNav>
);
```

### Step 4: Update Watchlist.tsx

**File:** `src/pages/Watchlist.tsx`

**Add Import (top of file):**

```typescript
import { TwoLevelNav } from "@/components/TwoLevelNav";
```

**Find the return statement** (search for `return (` in the component)

**Wrap content with:**

```typescript
return (
  <TwoLevelNav activeMenuId="giving" activeSubItemPath="/watchlist">
    {/* existing content */}
  </TwoLevelNav>
);
```

### Step 5: Update MarketplaceItemDetails.tsx

**File:** `src/pages/MarketplaceItemDetails.tsx`

**Add Import (top of file):**

```typescript
import { TwoLevelNav } from "@/components/TwoLevelNav";
```

**Find the return statement** (search for `return (` in the component)

**Wrap content with:**

```typescript
return (
  <TwoLevelNav activeMenuId="giving" activeSubItemPath="/marketplace">
    {/* existing content */}
  </TwoLevelNav>
);
```

### Step 6: Update MyDashboard.tsx

**File:** `src/pages/MyDashboard.tsx`

**Add Import (top of file):**

```typescript
import { TwoLevelNav } from "@/components/TwoLevelNav";
```

**Find the return statement** (search for `return (` in the component)

**Wrap content with:**

```typescript
return (
  <TwoLevelNav activeMenuId="giving" activeSubItemPath="/my-dashboard">
    {/* existing content */}
  </TwoLevelNav>
);
```

## Verification Checklist

After implementation, verify:

1. ✅ Each giving page imports TwoLevelNav
2. ✅ Each giving page wraps its content with TwoLevelNav
3. ✅ activeMenuId is set to "giving" for all giving pages
4. ✅ activeSubItemPath matches the route path for each page
5. ✅ Only ONE navigation panel renders (TwoLevelNav)
6. ✅ No double-rendering of sidebars
7. ✅ Build completes successfully with no errors

## Expected TwoLevelNav Menu Mappings

From `src/components/TwoLevelNav.tsx` (lines 58-68):

```typescript
{
  id: "giving",
  label: "Giving",
  icon: Gift,
  subItems: [
    { label: "Giving", icon: Gift, path: "/giving" },
    { label: "Received", icon: Package, path: "/received" },
    { label: "Watchlist", icon: Heart, path: "/watchlist" },
    { label: "Marketplace", icon: ShoppingBag, path: "/marketplace" },
  ],
}
```

**Note:** MyDashboard uses path `/my-dashboard` but TwoLevelNav menu doesn't have this item. We need to add it.

### Step 7: Add "My Dashboard" to TwoLevelNav Giving Menu

**File:** `src/components/TwoLevelNav.tsx` (line 67, after Marketplace)

**Add:**

```typescript
{ label: "My Dashboard", icon: LayoutDashboard, path: "/my-dashboard" },
```

This will add the My Dashboard sub-item to the giving menu.

## Result

All six giving pages will have:

- Same two-level navigation menu on the left
- "Giving" tab (primary gift icon) always selected in first panel
- Appropriate sub-item highlighted in second panel based on current page:
  - `/giving` → "Giving" highlighted
  - `/received` → "Received" highlighted
  - `/watchlist` → "Watchlist" highlighted
  - `/marketplace` → "Marketplace" highlighted
  - `/my-dashboard` → "My Dashboard" highlighted
  - `/marketplace-item/:id` → "Marketplace" highlighted (same as marketplace)
- Functional navigation between giving pages
- Page content displayed in main content area
- **NO double-panel rendering** - only TwoLevelNav
