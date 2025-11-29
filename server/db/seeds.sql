-- Users (password is 'password' hashed with bcrypt)
INSERT INTO users (username, password_hash) 
VALUES ('admin', '$2b$10$2wTD.h.EPu4so332l0wJauHjJBEbKGYub6TbEgl1Ir7iWGWYbsqaW') 
ON CONFLICT (username) DO NOTHING;

-- Content
INSERT INTO content (key, text_en, text_se) VALUES 
('terms', 'These are the terms and conditions in English. Lorem ipsum dolor sit amet...', 'Detta är villkoren på svenska. Lorem ipsum dolor sit amet...');

-- Products
INSERT INTO products (name, in_price, price, description) VALUES
('Basic Subscription', 100.00, 150.00, 'Basic monthly subscription'),
('Premium Subscription', 200.00, 299.00, 'Premium monthly subscription'),
('Enterprise Package', 500.00, 799.00, 'Enterprise solution'),
('Consulting Hour', 80.00, 120.00, 'One hour of consulting'),
('Setup Fee', 50.00, 50.00, 'One-time setup fee'),
('Support Plan A', 20.00, 30.00, 'Basic support'),
('Support Plan B', 50.00, 80.00, 'Priority support'),
('Extra User License', 10.00, 15.00, 'Per user license'),
('Storage 10GB', 5.00, 8.00, 'Extra storage'),
('Storage 50GB', 20.00, 35.00, 'Extra storage'),
('Storage 100GB', 35.00, 60.00, 'Extra storage'),
('API Access', 150.00, 200.00, 'API access key'),
('White Labeling', 300.00, 500.00, 'Remove branding'),
('Custom Domain', 10.00, 15.00, 'Use your own domain'),
('SSL Certificate', 0.00, 10.00, 'Secure connection'),
('Email Integration', 15.00, 25.00, 'SMTP service'),
('SMS Pack 100', 10.00, 15.00, '100 SMS credits'),
('SMS Pack 500', 45.00, 70.00, '500 SMS credits'),
('Backup Service', 25.00, 40.00, 'Daily backups'),
('Audit Log', 30.00, 50.00, 'Access to audit logs');


