-- Regenerate types by making a small change to ensure schema is current
-- This will trigger type regeneration
DO $$ 
BEGIN 
  -- Simple operation to refresh the schema
  PERFORM 1;
END $$;