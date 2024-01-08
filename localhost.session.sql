

-- @block
INSERT INTO `users` (`id`, `email`, `username`, `password`, `rol`)
VALUES (NULL, 'cesar.yohan@kmmp.com.pe', 'cesary', '123456', 'client')

-- @block
-- Get email users by rols "client"

SELECT `email` FROM `users` WHERE `rol` = 'client'
