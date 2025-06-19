# Events Feature Implementation

This document outlines the events feature that has been implemented for the CIX Lab website.

## Overview

The events feature allows users to create, manage, and display events through Sanity CMS and view them on the Next.js frontend. Events are automatically categorized as upcoming or past based on their date.

## Features

### Event Schema (Sanity)

- **Title**: Required string field
- **Slug**: Auto-generated from title, required for URL routing
- **Description**: Required text field for event summary
- **Content**: Optional rich text content using blockContent
- **Image**: Required image field with alt text validation
- **Date**: Required datetime field
- **Location**: Required string field
- **Is Upcoming**: Boolean field to manually mark event status

### Frontend Pages

#### 1. Events List Page (`/events`)

- Displays all events in a grid layout
- Tab navigation between "Upcoming Events" and "Past Events"
- Automatic categorization based on event date
- Responsive design with hover effects
- Event cards show:
  - Event image
  - Title and description
  - Date and time
  - Location
  - Status badge (Upcoming/Ongoing/Past)

#### 2. Individual Event Page (`/events/[slug]`)

- Detailed view of a single event
- Hero section with event image
- Event details (date, time, location)
- Rich content area for additional information
- Sidebar with event summary
- Back navigation to events list

### Components

#### EventsGrid Component

- Client-side component with tab filtering
- Responsive grid layout
- Status-based color coding
- Image optimization with Sanity image URLs

#### Navigation Updates

- Added "Events" link to main navigation
- Updated RedNavigationBar to support events page
- Mobile-responsive navigation

### Technical Implementation

#### Sanity Schema

- File: `studio/src/schemaTypes/documents/event.ts`
- Added to schema index: `studio/src/schemaTypes/index.ts`
- Includes preview configuration for Sanity Studio

#### Next.js Pages

- Main events page: `nextjs-app/app/events/page.tsx`
- Individual event page: `nextjs-app/app/events/[slug]/page.tsx`
- Loading state: `nextjs-app/app/events/[slug]/loading.tsx`
- Not found page: `nextjs-app/app/events/[slug]/not-found.tsx`

#### Components

- EventsGrid: `nextjs-app/components/EventsGrid.tsx`
- Updated Header: `nextjs-app/app/components/Header.tsx`
- Updated RedNavigationBar: `nextjs-app/components/RedNavigationBar.tsx`

#### SEO & Performance

- Updated sitemap to include events
- Static generation for individual event pages
- Metadata generation for SEO
- Image optimization with Next.js Image component

## Usage

### Adding Events in Sanity Studio

1. Navigate to Sanity Studio
2. Create a new "Event" document
3. Fill in required fields:
   - Title
   - Description
   - Upload an image
   - Set date and time
   - Enter location
4. Optionally add rich content
5. Publish the event

### Frontend Display

- Events are automatically sorted by date
- Upcoming events appear in the "Upcoming Events" tab
- Past events appear in the "Past Events" tab
- Events are clickable and navigate to individual event pages

## File Structure

```
studio/
├── src/schemaTypes/
│   ├── documents/
│   │   └── event.ts          # Event schema definition
│   └── index.ts              # Updated schema index

nextjs-app/
├── app/
│   ├── events/
│   │   ├── page.tsx          # Main events page
│   │   └── [slug]/
│   │       ├── page.tsx      # Individual event page
│   │       ├── loading.tsx   # Loading state
│   │       └── not-found.tsx # 404 page
│   ├── components/
│   │   └── Header.tsx        # Updated with events link
│   └── sitemap.ts            # Updated to include events
├── components/
│   ├── EventsGrid.tsx        # Events grid component
│   └── RedNavigationBar.tsx  # Updated navigation bar
└── sanity/
    └── lib/
        └── queries.ts        # Updated sitemap query
```

## Next Steps

1. Deploy the Sanity schema changes
2. Generate updated TypeScript types
3. Test the events functionality
4. Add any additional features as needed (e.g., event registration, categories, etc.)
