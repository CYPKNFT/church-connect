-- Update existing admin and pastor roles to have admin ministry area
UPDATE church_roles 
SET ministry_area = 'admin' 
WHERE role IN ('admin', 'pastor');