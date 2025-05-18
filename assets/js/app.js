// Main application JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Common utility functions
    const utils = {
        // Format price to 2 decimal places with ₱ symbol
        formatPrice: function(price) {
            return `₱${parseFloat(price).toFixed(2)}`;
        },
        
        // Generate a random order number
        generateOrderNumber: function() {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const letter = letters[Math.floor(Math.random() * letters.length)];
            const numbers = Math.floor(1000 + Math.random() * 9000);
            return letter + numbers;
        },
        
        // Capitalize first letter of a string
        capitalizeFirstLetter: function(string) {
            if (!string) return '';
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        
        // Get current formatted date
        getCurrentFormattedDate: function() {
            const today = new Date();
            return `${today.getMonth() + 1} · ${today.getDate()} · ${today.getFullYear()}`;
        },
        
        // Show toast notification
        showToast: function(message, iconType) {
            // Create toast container if it doesn't exist
            let toastContainer = document.getElementById('toast-container');
            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.id = 'toast-container';
                toastContainer.className = 'toast-container';
                toastContainer.style.position = 'fixed';
                toastContainer.style.bottom = '20px';
                toastContainer.style.left = '50%';
                toastContainer.style.transform = 'translateX(-50%)';
                toastContainer.style.zIndex = '1000';
                document.body.appendChild(toastContainer);
            }
            
            // Create toast element
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.style.backgroundColor = 'rgba(40, 40, 40, 0.9)';
            toast.style.color = 'white';
            toast.style.padding = '12px 20px';
            toast.style.borderRadius = '8px';
            toast.style.fontSize = '0.9rem';
            toast.style.marginBottom = '10px';
            toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            toast.style.display = 'flex';
            toast.style.alignItems = 'center';
            toast.style.gap = '10px';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            toast.style.transition = 'all 0.3s ease';
            
            // Set icon based on type
            let iconClass = 'fas fa-check';
            if (iconType === 'heart') iconClass = 'fas fa-heart';
            if (iconType === 'heart-broken') iconClass = 'fas fa-heart-broken';
            if (iconType === 'cart') iconClass = 'fas fa-shopping-cart';
            
            // Set toast content
            toast.innerHTML = `
                <div class="toast-icon" style="font-size: 1.1rem;"><i class="${iconClass}"></i></div>
                <div class="toast-message" style="flex: 1;">${message}</div>
            `;
            
            // Add to container
            toastContainer.appendChild(toast);
            
            // Show toast with animation
            setTimeout(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateY(0)';
            }, 10);
            
            // Remove toast after delay
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 3000);
        }
    };

    const userProfile = {
        init: function() {
            // Check if user is logged in
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            // Update user profile on home page
            const userProfileElement = document.querySelector('.user-profile h2');
            if (userProfileElement && currentUser) {
                userProfileElement.textContent = `Hello, ${currentUser.name.split(' ')[0]}!`;
            }
            
            // Update contact info on payment page
            const contactInfoElement = document.querySelector('.contact-info .info-value');
            if (contactInfoElement && currentUser) {
                contactInfoElement.textContent = currentUser.email;
            }
            
            // Add logout functionality to avatar
            const avatarElement = document.querySelector('.avatar');
            if (avatarElement) {
                avatarElement.style.cursor = 'pointer';
                avatarElement.addEventListener('click', function() {
                    // Show logout confirmation
                    if (confirm('Do you want to logout?')) {
                        // Remove current user from localStorage
                        localStorage.removeItem('currentUser');
                        
                        // Redirect to login page
                        window.location.href = 'login.html';
                    }
                });
            }
        }
    };

    // Product data
    const productData = {
        products: {
            'pancake': {
                id: 'pancake',
                name: 'Pancake',
                price: 20.00,
                image: './assets/pancake.jpg?height=300&width=600',
                rating: 4.5,
                category: 'breakfast',
                description: 'A classic breakfast staple, our pancakes are fluffy and golden brown. Served with your choice of syrup and butter.'
            },
            'waffle': {
                id: 'waffle',
                name: 'Waffle',
                price: 20.00,
                image: './assets/waffle.jpg?height=300&width=600',
                rating: 3.8,
                category: 'breakfast',
                description: 'Crispy on the outside and soft on the inside, our waffles are a delightful treat.'
            },
            'adobo': {
                id: 'adobo',
                name: 'Adobo',
                price: 75.00,
                image: './assets/adobo.png?height=300&width=600',
                rating: 4.2,
                category: 'lunch',
                description: 'A Filipino favorite, our adobo is marinated in soy sauce, vinegar, and spices.'
            },
            'hotsilog': {
                id: 'hotsilog',
                name: 'Hotsilog',
                price: 75.00,
                image: './assets/hotsilog.jpg?height=300&width=600',
                rating: 4.7,
                category: 'dinner',
                description: 'A Filipino breakfast classic with hotdog, fried rice, and egg.'
            },
            'turon': {
                id: 'turon',
                name: 'Turon',
                price: 15.00,
                image: './assets/turon.jpg?height=300&width=600',
                rating: 4.3,
                category: 'dessert',
                description: 'Sweet banana wrapped in spring roll wrapper and fried to golden perfection.'
            },
            'sopas': {
                id: 'sopas',
                name: 'Sopas',
                price: 35.00,
                image: './assets/sopas.jpg?height=300&width=600',
                rating: 4.1,
                category: 'lunch dinner',
                description: 'A creamy Filipino macaroni soup with chicken and vegetables.'
            }
        },
        
        // Get product by ID
        getProduct: function(productId) {
            return this.products[productId] || null;
        },
        
        // Get all products
        getAllProducts: function() {
            return Object.values(this.products);
        }
    };
    
    // Favorites functionality
    const favoritesSystem = {
        // Initialize favorites
        init: function() {
            // Create favorites array in localStorage if it doesn't exist
            if (!localStorage.getItem('favorites')) {
                localStorage.setItem('favorites', JSON.stringify([]));
            }
            
            // Add favorite button to product detail page if it exists
            const productDetail = document.querySelector('.product-detail');
            if (productDetail) {
                this.initProductDetailFavorite();
            }
            
            // Initialize favorites page if we're on it
            const favoritesGrid = document.getElementById('favorites-grid');
            if (favoritesGrid) {
                this.initFavoritesPage();
            }
            
            // Add favorite buttons to menu items on home page
            const menuItems = document.querySelectorAll('.menu-item');
            if (menuItems.length > 0) {
                this.initHomePageFavorites(menuItems);
            }
        },
        
        // Initialize favorite button on product detail page
        initProductDetailFavorite: function() {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('product');
            
            if (!productId) return;
            
            // Get product data
            const product = productData.getProduct(productId);
            if (!product) return;
            
            // Check if favorite button already exists
            let favoriteBtn = document.getElementById('favorite-btn');
            
            // If favorite button doesn't exist, create it
            if (!favoriteBtn) {
                // Create favorite button
                favoriteBtn = document.createElement('button');
                favoriteBtn.id = 'favorite-btn';
                favoriteBtn.className = 'favorite-btn';
                favoriteBtn.innerHTML = '<i id="favorite-icon" class="far fa-heart"></i>';
                
                // Style the button
                favoriteBtn.style.position = 'absolute';
                favoriteBtn.style.top = '15px';
                favoriteBtn.style.right = '15px';
                favoriteBtn.style.width = '40px';
                favoriteBtn.style.height = '40px';
                favoriteBtn.style.borderRadius = '50%';
                favoriteBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                favoriteBtn.style.display = 'flex';
                favoriteBtn.style.alignItems = 'center';
                favoriteBtn.style.justifyContent = 'center';
                favoriteBtn.style.border = 'none';
                favoriteBtn.style.cursor = 'pointer';
                favoriteBtn.style.color = '#888';
                favoriteBtn.style.fontSize = '1.2rem';
                favoriteBtn.style.transition = 'all 0.3s ease';
                favoriteBtn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                favoriteBtn.style.zIndex = '10';
                
                // Add hover effect
                favoriteBtn.addEventListener('mouseover', function() {
                    this.style.transform = 'scale(1.1)';
                    this.style.backgroundColor = 'white';
                });
                
                favoriteBtn.addEventListener('mouseout', function() {
                    this.style.transform = 'scale(1)';
                    this.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                });
                
                // Add to product image container
                const productImageContainer = document.querySelector('.product-image-container');
                if (productImageContainer) {
                    productImageContainer.appendChild(favoriteBtn);
                }
            }
            
            // Check if product is in favorites
            const isFavorite = this.isProductFavorite(productId);
            const favoriteIcon = document.getElementById('favorite-icon');
            
            if (isFavorite && favoriteIcon) {
                favoriteIcon.classList.remove('far');
                favoriteIcon.classList.add('fas');
                favoriteBtn.classList.add('active');
                favoriteBtn.style.color = '#ff6b6b';
            } else if (favoriteIcon) {
                favoriteIcon.classList.remove('fas');
                favoriteIcon.classList.add('far');
                favoriteBtn.classList.remove('active');
                favoriteBtn.style.color = '#888';
            }
            
            // Add click event to favorite button
            favoriteBtn.addEventListener('click', () => {
                this.toggleFavorite(product);
                
                // Update button appearance
                const isFavoriteNow = this.isProductFavorite(productId);
                if (isFavoriteNow) {
                    favoriteIcon.classList.remove('far');
                    favoriteIcon.classList.add('fas');
                    favoriteBtn.classList.add('active');
                    favoriteBtn.style.color = '#ff6b6b';
                    
                    // Add heart beat animation
                    favoriteBtn.style.animation = 'heartBeat 0.3s ease-in-out';
                    setTimeout(() => {
                        favoriteBtn.style.animation = '';
                    }, 300);
                    
                    utils.showToast('Added to favorites', 'heart');
                } else {
                    favoriteIcon.classList.remove('fas');
                    favoriteIcon.classList.add('far');
                    favoriteBtn.classList.remove('active');
                    favoriteBtn.style.color = '#888';
                    
                    utils.showToast('Removed from favorites', 'heart-broken');
                }
            });
        },
        
        // Initialize favorites on home page
        initHomePageFavorites: function(menuItems) {
            menuItems.forEach(item => {
                // Get product ID from href
                const href = item.getAttribute('href');
                if (!href) return;
                
                const productId = href.split('=')[1];
                if (!productId) return;
                
                // Create favorite button
                const favoriteBtn = document.createElement('button');
                favoriteBtn.className = 'menu-favorite-btn';
                
                // Style the button
                favoriteBtn.style.position = 'absolute';
                favoriteBtn.style.top = '10px';
                favoriteBtn.style.right = '10px';
                favoriteBtn.style.width = '30px';
                favoriteBtn.style.height = '30px';
                favoriteBtn.style.borderRadius = '50%';
                favoriteBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                favoriteBtn.style.display = 'flex';
                favoriteBtn.style.alignItems = 'center';
                favoriteBtn.style.justifyContent = 'center';
                favoriteBtn.style.border = 'none';
                favoriteBtn.style.cursor = 'pointer';
                favoriteBtn.style.fontSize = '0.9rem';
                favoriteBtn.style.transition = 'all 0.2s ease';
                favoriteBtn.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                favoriteBtn.style.zIndex = '5';
                
                // Check if product is in favorites
                const isFavorite = this.isProductFavorite(productId);
                
                if (isFavorite) {
                    favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
                    favoriteBtn.style.color = '#ff6b6b';
                } else {
                    favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
                    favoriteBtn.style.color = '#888';
                }
                
                // Add hover effect
                favoriteBtn.addEventListener('mouseover', function() {
                    this.style.transform = 'scale(1.1)';
                    this.style.backgroundColor = 'white';
                });
                
                favoriteBtn.addEventListener('mouseout', function() {
                    this.style.transform = 'scale(1)';
                    this.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                });
                
                // Add click event to favorite button
                favoriteBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const product = productData.getProduct(productId);
                    if (!product) return;
                    
                    this.toggleFavorite(product);
                    
                    // Update button appearance
                    const isFavoriteNow = this.isProductFavorite(productId);
                    if (isFavoriteNow) {
                        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
                        favoriteBtn.style.color = '#ff6b6b';
                        utils.showToast('Added to favorites', 'heart');
                    } else {
                        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
                        favoriteBtn.style.color = '#888';
                        utils.showToast('Removed from favorites', 'heart-broken');
                    }
                });
                
                // Find the image container and add the button
                const imgContainer = item.querySelector('.menu-img');
                if (imgContainer) {
                    // Make the container position relative if it's not already
                    imgContainer.style.position = 'relative';
                    imgContainer.parentNode.appendChild(favoriteBtn);
                }
            });
        },
        
        // Initialize favorites page
        initFavoritesPage: function() {
            const favoritesGrid = document.getElementById('favorites-grid');
            const emptyFavorites = document.getElementById('empty-favorites');
            const editButton = document.getElementById('edit-favorites');
            const sortButton = document.getElementById('sort-favorites');
            
            // Get favorites from localStorage
            const favorites = this.getFavorites();
            
            // If no favorites, show empty state
            if (favorites.length === 0) {
                if (favoritesGrid) favoritesGrid.style.display = 'none';
                if (emptyFavorites) emptyFavorites.style.display = 'flex';
                return;
            }
            
            // Clear favorites grid
            if (favoritesGrid) favoritesGrid.innerHTML = '';
            
            // Add favorites to grid
            favorites.forEach(item => {
                const favoriteItem = document.createElement('div');
                favoriteItem.className = 'favorite-item';
                favoriteItem.setAttribute('data-category', item.category);
                
                favoriteItem.innerHTML = `
                    <div class="favorite-img-container">
                        <img src="${item.image}" alt="${item.name}" class="favorite-img">
                        <div class="favorite-category">${utils.capitalizeFirstLetter(item.category)}</div>
                        <div class="favorite-actions">
                            <button class="favorite-action-btn remove" data-id="${item.id}">
                                <i class="fas fa-heart-broken"></i>
                            </button>
                            <button class="favorite-action-btn cart" data-id="${item.id}">
                                <i class="fas fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="favorite-info">
                        <a href="product-detail.html?product=${item.id}" class="favorite-name">${item.name}</a>
                        <div class="favorite-details">
                            <div class="favorite-rating">
                                <span class="favorite-star">⭐</span>
                                <span>${item.rating}</span>
                            </div>
                            <div class="favorite-price">${utils.formatPrice(item.price)}</div>
                        </div>
                    </div>
                `;
                
                if (favoritesGrid) favoritesGrid.appendChild(favoriteItem);
            });
            
            // Filter favorites by category
            const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all filter buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Get filter value
                    const filter = this.getAttribute('data-filter');
                    
                    // Filter favorites
                    const favoriteItems = document.querySelectorAll('.favorite-item');
                    let visibleCount = 0;
                    
                    favoriteItems.forEach(item => {
                        if (filter === 'all') {
                            item.style.display = 'block';
                            visibleCount++;
                        } else {
                            if (item.getAttribute('data-category') === filter) {
                                item.style.display = 'block';
                                visibleCount++;
                            } else {
                                item.style.display = 'none';
                            }
                        }
                    });
                    
                    // Show/hide empty state
                    if (visibleCount === 0) {
                        if (favoritesGrid) favoritesGrid.style.display = 'none';
                        if (emptyFavorites) emptyFavorites.style.display = 'flex';
                    } else {
                        if (favoritesGrid) favoritesGrid.style.display = 'grid';
                        if (emptyFavorites) emptyFavorites.style.display = 'none';
                    }
                });
            });
            
            // Filter by collection
            const collectionButtons = document.querySelectorAll('.filter-btn[data-collection]');
            collectionButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all collection buttons
                    collectionButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Get collection value
                    const collection = this.getAttribute('data-collection');
                    
                    // In a real app, you would filter by collection here
                    console.log(`Filtering by collection: ${collection}`);
                    
                    // For this demo, we'll just reset the category filter to show all
                    if (collection !== 'all') {
                        // Find the "All" category filter and click it
                        const allCategoryFilter = document.querySelector('.filter-btn[data-filter="all"]');
                        if (allCategoryFilter) {
                            allCategoryFilter.click();
                        }
                    }
                });
            });
            
            // Add event listeners to remove buttons
            const removeButtons = document.querySelectorAll('.favorite-action-btn.remove');
            removeButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const productId = button.getAttribute('data-id');
                    const favoriteItem = button.closest('.favorite-item');
                    
                    // Confirm removal
                    if (confirm('Remove this item from your favorites?')) {
                        // Animation for removal
                        favoriteItem.style.opacity = '0';
                        favoriteItem.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            // Remove from favorites
                            this.removeFavorite(productId);
                            
                            // Remove from DOM
                            favoriteItem.remove();
                            
                            // Check if there are any favorites left
                            const remainingFavorites = document.querySelectorAll('.favorite-item');
                            if (remainingFavorites.length === 0) {
                                if (favoritesGrid) favoritesGrid.style.display = 'none';
                                if (emptyFavorites) emptyFavorites.style.display = 'flex';
                            }
                        }, 300);
                    }
                });
            });
            
            // Add event listeners to add to cart buttons
            const addToCartButtons = document.querySelectorAll('.favorite-action-btn.cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const productId = button.getAttribute('data-id');
                    const product = productData.getProduct(productId);
                    
                    if (product) {
                        // Add to cart
                        this.addToCart(product);
                        
                        // Visual feedback
                        button.innerHTML = '<i class="fas fa-check"></i>';
                        button.style.backgroundColor = '#28c76f';
                        button.style.color = 'white';
                        
                        setTimeout(() => {
                            button.innerHTML = '<i class="fas fa-cart-plus"></i>';
                            button.style.backgroundColor = '';
                            button.style.color = '';
                        }, 1500);
                        
                        utils.showToast(`${product.name} added to cart`, 'cart');
                    }
                });
            });
            
            // Edit favorites
            if (editButton) {
                editButton.addEventListener('click', function() {
                    // Toggle edit mode
                    const isEditing = favoritesGrid.classList.toggle('editing');
                    
                    if (isEditing) {
                        // Change button text
                        this.innerHTML = '<i class="fas fa-check"></i> Done';
                        
                        // Show remove buttons
                        removeButtons.forEach(btn => {
                            btn.style.display = 'flex';
                        });
                        
                        // Hide add to cart buttons
                        addToCartButtons.forEach(btn => {
                            btn.style.display = 'none';
                        });
                    } else {
                        // Restore button text
                        this.innerHTML = '<i class="fas fa-edit"></i> Edit';
                        
                        // Show both buttons
                        removeButtons.forEach(btn => {
                            btn.style.display = 'flex';
                        });
                        
                        addToCartButtons.forEach(btn => {
                            btn.style.display = 'flex';
                        });
                    }
                });
            }
            
            // Sort favorites
            if (sortButton) {
                sortButton.addEventListener('click', function() {
                    // Show sort options in a dropdown or modal
                    const sortOptions = ['Name (A-Z)', 'Name (Z-A)', 'Price (Low to High)', 'Price (High to Low)', 'Rating'];
                    
                    // For this demo, we'll just show an alert
                    alert('Sort options: ' + sortOptions.join(', '));
                    
                    // In a real app, you would implement sorting logic here
                });
            }
        },
        
        // Check if a product is in favorites
        isProductFavorite: function(productId) {
            const favorites = this.getFavorites();
            return favorites.some(item => item.id === productId);
        },
        
        // Get favorites from localStorage
        getFavorites: function() {
            return JSON.parse(localStorage.getItem('favorites')) || [];
        },
        
        // Add a product to favorites
        addFavorite: function(product) {
            const favorites = this.getFavorites();
            
            // Check if product is already in favorites
            if (!this.isProductFavorite(product.id)) {
                favorites.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    rating: product.rating,
                    category: product.category
                });
                
                localStorage.setItem('favorites', JSON.stringify(favorites));
                return true;
            }
            
            return false;
        },
        
        // Remove a product from favorites
        removeFavorite: function(productId) {
            const favorites = this.getFavorites();
            const updatedFavorites = favorites.filter(item => item.id !== productId);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            return true;
        },
        
        // Toggle favorite status
        toggleFavorite: function(product) {
            if (this.isProductFavorite(product.id)) {
                return this.removeFavorite(product.id);
            } else {
                return this.addFavorite(product);
            }
        },
        
        // Add product to cart
        addToCart: function(product) {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            
            // Create new cart item
            const newItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                addons: [],
                image: product.image
            };
            
            // Add to cart
            cartItems.push(newItem);
            
            // Save to localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    };
    
    // Notifications functionality
    const notificationsSystem = {
        init: function() {
            // Check if we're on the notifications page
            if (!document.querySelector('.notification-list')) return;
            
            // Get elements
            const filterButtons = document.querySelectorAll('.filter-btn');
            const notificationItems = document.querySelectorAll('.notification-item');
            const notificationList = document.getElementById('notification-list');
            const emptyNotifications = document.getElementById('empty-notifications');
            const markAllReadBtn = document.getElementById('mark-all-read');
            
            // Add click event to filter buttons
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Get filter value
                    const filter = this.getAttribute('data-filter');
                    
                    // Filter notifications
                    let visibleCount = 0;
                    
                    notificationItems.forEach(item => {
                        if (filter === 'all') {
                            item.style.display = 'block';
                            visibleCount++;
                        } else if (filter === 'unread') {
                            if (item.classList.contains('unread')) {
                                item.style.display = 'block';
                                visibleCount++;
                            } else {
                                item.style.display = 'none';
                            }
                        } else {
                            if (item.getAttribute('data-type') === filter) {
                                item.style.display = 'block';
                                visibleCount++;
                            } else {
                                item.style.display = 'none';
                            }
                        }
                    });
                    
                    // Show/hide date separators based on visible notifications
                    const dateSeparators = document.querySelectorAll('.date-separator');
                    dateSeparators.forEach(separator => {
                        let nextElement = separator.nextElementSibling;
                        let hasVisibleNotification = false;
                        
                        // Check if there's a visible notification after this separator and before the next separator
                        while (nextElement && !nextElement.classList.contains('date-separator')) {
                            if (nextElement.classList.contains('notification-item') && 
                                nextElement.style.display !== 'none') {
                                hasVisibleNotification = true;
                                break;
                            }
                            nextElement = nextElement.nextElementSibling;
                        }
                        
                        separator.style.display = hasVisibleNotification ? 'flex' : 'none';
                    });
                    
                    // Show empty state if no notifications match the filter
                    if (visibleCount === 0) {
                        notificationList.style.display = 'none';
                        emptyNotifications.style.display = 'flex';
                    } else {
                        notificationList.style.display = 'flex';
                        emptyNotifications.style.display = 'none';
                    }
                });
            });
            
            // Mark as read functionality
            const markReadButtons = document.querySelectorAll('.mark-read');
            markReadButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const notificationId = this.getAttribute('data-id');
                    const notificationItem = this.closest('.notification-item');
                    
                    // Remove unread class
                    notificationItem.classList.remove('unread');
                    
                    // Remove the mark as read button
                    this.remove();
                    
                    // You would typically send an API request here to update the notification status
                    console.log(`Marked notification ${notificationId} as read`);
                    
                    // Update notifications in localStorage
                    this.updateNotificationStatus(notificationId, 'read');
                });
            });
            
            // Mark all as read
            if (markAllReadBtn) {
                markAllReadBtn.addEventListener('click', function() {
                    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
                    
                    unreadNotifications.forEach(notification => {
                        // Remove unread class
                        notification.classList.remove('unread');
                        
                        // Remove mark as read button
                        const markReadBtn = notification.querySelector('.mark-read');
                        if (markReadBtn) {
                            markReadBtn.remove();
                        }
                        
                        // Get notification ID
                        const notificationId = notification.getAttribute('data-id');
                        if (notificationId) {
                            // Update notification status in localStorage
                            notificationsSystem.updateNotificationStatus(notificationId, 'read');
                        }
                    });
                    
                    // You would typically send an API request here to update all notifications
                    console.log('Marked all notifications as read');
                });
            }
            
            // Make notification items clickable
            notificationItems.forEach(item => {
                item.addEventListener('click', function() {
                    const type = this.getAttribute('data-type');
                    const notificationId = this.getAttribute('data-id');
                    
                    // Handle click based on notification type
                    switch(type) {
                        case 'order':
                            // Navigate to order details
                            console.log('Navigate to order details');
                            window.location.href = 'order-tracking.html';
                            break;
                        case 'promo':
                            // Navigate to promotions page
                            console.log('Navigate to promotions');
                            window.location.href = 'home.html';
                            break;
                        case 'system':
                            // Handle system notification
                            console.log('Handle system notification');
                            break;
                    }
                    
                    // Mark as read when clicked
                    if (this.classList.contains('unread')) {
                        this.classList.remove('unread');
                        
                        // Remove mark as read button
                        const markReadBtn = this.querySelector('.mark-read');
                        if (markReadBtn) {
                            markReadBtn.remove();
                        }
                        
                        // Update notification status in localStorage
                        if (notificationId) {
                            notificationsSystem.updateNotificationStatus(notificationId, 'read');
                        }
                    }
                });
            });
        },
        
        // Update notification status in localStorage
        updateNotificationStatus: function(notificationId, status) {
            // Get notifications from localStorage
            const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
            
            // Find notification by ID
            const notification = notifications.find(n => n.id === notificationId);
            
            // Update status if found
            if (notification) {
                notification.status = status;
                localStorage.setItem('notifications', JSON.stringify(notifications));
            }
        },
        
        // Add a new notification
        addNotification: function(notification) {
            // Get notifications from localStorage
            const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
            
            // Add new notification
            notifications.unshift({
                id: notification.id || `notification-${Date.now()}`,
                title: notification.title,
                message: notification.message,
                type: notification.type || 'system',
                status: 'unread',
                timestamp: notification.timestamp || new Date().toISOString(),
                icon: notification.icon || 'fas fa-bell'
            });
            
            // Save to localStorage
            localStorage.setItem('notifications', JSON.stringify(notifications));
            
            // Update notification badge
            this.updateNotificationBadge();
        },
        
        // Update notification badge
        updateNotificationBadge: function() {
            // Get notifications from localStorage
            const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
            
            // Count unread notifications
            const unreadCount = notifications.filter(n => n.status === 'unread').length;
            
            // Get notification badge
            const notificationBadge = document.querySelector('.notification-badge');
            
            // Update badge
            if (notificationBadge) {
                if (unreadCount > 0) {
                    notificationBadge.textContent = unreadCount;
                    notificationBadge.style.display = 'block';
                } else {
                    notificationBadge.style.display = 'none';
                }
            }
        }
    };
    
    // Home page functionality
    const homePage = {
        init: function() {
            // Check if we're on the home page
            if (!document.querySelector('.category-list')) return;
            
            // Get all category items
            const categoryItems = document.querySelectorAll('.category-item');
            // Get all menu items
            const menuItems = document.querySelectorAll('.menu-item');
            // Get empty state elements
            const emptyPopular = document.getElementById('empty-popular');
            const emptyRecommended = document.getElementById('empty-recommended');
            // Get search input
            const searchInput = document.getElementById('search-input');
            
            // Add click event to category items
            categoryItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Remove active class from all category items
                    categoryItems.forEach(cat => cat.classList.remove('active'));
                    
                    // Add active class to clicked category
                    this.classList.add('active');
                    
                    // Get selected category
                    const selectedCategory = this.getAttribute('data-category');
                    
                    // Filter menu items
                    homePage.filterMenuItems(selectedCategory, menuItems, emptyPopular, emptyRecommended);
                });
            });
            
            // Add search functionality
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase().trim();
                    
                    if (searchTerm === '') {
                        // If search is empty, revert to category filtering
                        const activeCategory = document.querySelector('.category-item.active');
                        if (activeCategory) {
                            homePage.filterMenuItems(activeCategory.getAttribute('data-category'), menuItems, emptyPopular, emptyRecommended);
                        }
                    } else {
                        // Filter by search term
                        homePage.filterBySearch(searchTerm, menuItems, emptyPopular, emptyRecommended);
                    }
                });
            }
            
            // Initialize with "All" category
            homePage.filterMenuItems('all', menuItems, emptyPopular, emptyRecommended);
        },
        
        // Function to filter menu items by category
        filterMenuItems: function(category, menuItems, emptyPopular, emptyRecommended) {
            // Reset search input
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.value = '';
            
            let popularCount = 0;
            let recommendedCount = 0;
            
            // Loop through all menu items
            menuItems.forEach(item => {
                const itemCategories = item.getAttribute('data-category')?.split(' ') || [];
                const isInPopular = item.closest('#popular-menu') !== null;
                const isInRecommended = item.closest('#recommended-menu') !== null;
                
                // Check if item belongs to selected category or if "all" is selected
                if (category === 'all' || itemCategories.includes(category)) {
                    item.classList.remove('hidden');
                    
                    // Count visible items in each section
                    if (isInPopular) popularCount++;
                    if (isInRecommended) recommendedCount++;
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Show/hide empty states
            if (emptyPopular) emptyPopular.style.display = popularCount === 0 ? 'block' : 'none';
            if (emptyRecommended) emptyRecommended.style.display = recommendedCount === 0 ? 'block' : 'none';
        },
        
        // Function to filter menu items by search term
        filterBySearch: function(searchTerm, menuItems, emptyPopular, emptyRecommended) {
            let popularCount = 0;
            let recommendedCount = 0;
            
            // Loop through all menu items
            menuItems.forEach(item => {
                const itemName = item.querySelector('.menu-name')?.textContent.toLowerCase() || '';
                const isInPopular = item.closest('#popular-menu') !== null;
                const isInRecommended = item.closest('#recommended-menu') !== null;
                
                // Check if item name contains search term
                if (itemName.includes(searchTerm)) {
                    item.classList.remove('hidden');
                    
                    // Count visible items in each section
                    if (isInPopular) popularCount++;
                    if (isInRecommended) recommendedCount++;
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Show/hide empty states
            if (emptyPopular) emptyPopular.style.display = popularCount === 0 ? 'block' : 'none';
            if (emptyRecommended) emptyRecommended.style.display = recommendedCount === 0 ? 'block' : 'none';
        }
    };
    
    // Product detail page functionality
    const productDetailPage = {
        init: function() {
            // Check if we're on the product detail page
            if (!document.querySelector('.product-detail')) return;
            
            // First, remove any existing event listeners by cloning and replacing elements
            const qtyBtnPlus = document.querySelector('.qty-btn-plus');
            const qtyBtnMinus = document.querySelector('.qty-btn-minus');
            const qtyValue = document.getElementById('qty-value');
            
            if (qtyBtnPlus && qtyBtnMinus) {
                const newQtyBtnPlus = qtyBtnPlus.cloneNode(true);
                const newQtyBtnMinus = qtyBtnMinus.cloneNode(true);
                
                qtyBtnPlus.parentNode.replaceChild(newQtyBtnPlus, qtyBtnPlus);
                qtyBtnMinus.parentNode.replaceChild(newQtyBtnMinus, qtyBtnMinus);
            }
            
            const urlParams = new URLSearchParams(window.location.search);
            const product = urlParams.get('product');
            
            if (product && productData.products[product]) {
                const productInfo = productData.products[product];
                
                // Display product details
                document.getElementById('product-name').textContent = productInfo.name;
                document.getElementById('product-price').textContent = utils.formatPrice(productInfo.price);
                document.getElementById('product-image').src = productInfo.image;
                document.getElementById('product-image').alt = productInfo.name;
                document.getElementById('product-rating').textContent = productInfo.rating;
                
                // Set product description if element exists
                const productDescription = document.getElementById('product-description');
                if (productDescription && productInfo.description) {
                    productDescription.textContent = productInfo.description;
                }
                
                document.title = `Golden Bites - ${productInfo.name}`;
                
                let basePrice = productInfo.price;
                const priceEl = document.getElementById('product-price');
                
                // Initialize addons array
                let selectedAddons = [];
                
                // Update total price based on quantity and selected addons
                function updateTotalPrice() {
                    let total = basePrice;
                    selectedAddons.forEach(addon => {
                        total += addon.price;
                    });
                    total *= parseInt(qtyValue.textContent); // Adjust with quantity
                    priceEl.textContent = utils.formatPrice(total);
                }
                
                // Get the NEW quantity control buttons (after replacement)
                const newQtyBtnPlus = document.querySelector('.qty-btn-plus');
                const newQtyBtnMinus = document.querySelector('.qty-btn-minus');
                
                // Increase quantity - add event listener to the NEW button
                if (newQtyBtnPlus) {
                    newQtyBtnPlus.addEventListener('click', function () {
                        console.log('Plus button clicked'); // Debug log
                        let quantity = parseInt(qtyValue.textContent);
                        if (!isNaN(quantity)) {
                            quantity++; // Increase by 1
                            qtyValue.textContent = quantity;
                            updateTotalPrice();
                        }
                    });
                }
                
                // Decrease quantity - add event listener to the NEW button
                if (newQtyBtnMinus) {
                    newQtyBtnMinus.addEventListener('click', function () {
                        console.log('Minus button clicked'); // Debug log
                        let quantity = parseInt(qtyValue.textContent);
                        if (!isNaN(quantity) && quantity > 1) {
                            quantity--; // Decrease by 1
                            qtyValue.textContent = quantity;
                            updateTotalPrice();
                        }
                    });
                }
                
                // Add/remove addons
                const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
                addonCheckboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', function () {
                        const addonPrice = parseFloat(checkbox.getAttribute('data-price'));
                        const addonName = checkbox.closest('.option-item').querySelector('.option-name').textContent;
                        
                        if (checkbox.checked) {
                            selectedAddons.push({ name: addonName, price: addonPrice });
                        } else {
                            selectedAddons = selectedAddons.filter(addon => addon.name !== addonName);
                        }
                        
                        updateTotalPrice(); // Recalculate total with addons
                    });
                });
                
                // Function to save order details to localStorage
                function saveOrderToLocalStorage() {
                    const quantity = parseInt(qtyValue.textContent);
                    const orderItems = [{
                        id: productInfo.id,
                        name: productInfo.name,
                        price: productInfo.price,
                        quantity: quantity,
                        addons: selectedAddons, // Note: using lowercase 'addons' consistently
                        image: productInfo.image
                    }];
                    
                    // Save to localStorage
                    localStorage.setItem('orderItems', JSON.stringify(orderItems));
                }
                
                // Add to Cart logic
                const addToCartBtn = document.getElementById('add-to-cart');
                if (addToCartBtn) {
                    addToCartBtn.addEventListener('click', function (e) {
                        e.preventDefault();  // Prevent default action
                        
                        const quantity = parseInt(qtyValue.textContent);  // Get the selected quantity
                        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                        
                        // Create the new cart item
                        const newItem = {
                            id: productInfo.id,
                            name: productInfo.name,
                            price: productInfo.price,
                            quantity: quantity,
                            addons: selectedAddons, // Note: using lowercase 'addons' consistently
                            image: productInfo.image
                        };
                        
                        // Add product and quantity to the cart with selected addons
                        cartItems.push(newItem);
                        
                        // Save to localStorage
                        localStorage.setItem('cartItems', JSON.stringify(cartItems));
                        
                        // Show toast notification
                        utils.showToast(`${productInfo.name} added to cart`, 'cart');
                        
                        // Add notification for cart update
                        notificationsSystem.addNotification({
                            title: 'Added to Cart',
                            message: `${productInfo.name} has been added to your cart.`,
                            type: 'system',
                            icon: 'fas fa-shopping-cart'
                        });
                        
                        // Redirect to cart page
                        window.location.href = 'order-details.html';
                    });
                }
                
                // Buy Now logic
                const buyNowBtn = document.querySelector('.primary-btn');
                if (buyNowBtn) {
                    buyNowBtn.addEventListener('click', function (e) {
                        e.preventDefault();  // Prevent default action
                        
                        // Save order details to localStorage
                        saveOrderToLocalStorage();
                        
                        // Redirect to payment page
                        window.location.href = 'payment.html';
                    });
                }
            }
        }
    };
    
    // Order details (cart) page functionality
    const orderDetailsPage = {
        init: function() {
            // Check if we're on the order details page
            if (!document.querySelector('.cart-items')) return;
            
            const cartContainer = document.querySelector('.cart-items');
            const totalAmountEl = document.querySelector('.total-amount');
            const proceedToPaymentBtn = document.querySelector('.pay-btn');
            
            // Load cart on page load
            this.loadCart(cartContainer, totalAmountEl, proceedToPaymentBtn);
            
            // When proceeding to payment, save cart items as order items
            if (proceedToPaymentBtn) {
                proceedToPaymentBtn.addEventListener('click', function(e) {
                    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                    if (cartItems.length === 0) {
                        e.preventDefault();
                        alert('Your cart is empty');
                    } else {
                        // Save cart items as order items for the payment page
                        localStorage.setItem('orderItems', JSON.stringify(cartItems));
                    }
                });
            }
        },
        
        loadCart: function(cartContainer, totalAmountEl, proceedToPaymentBtn) {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartContainer.innerHTML = '';
            let total = 0;
            
            if (cartItems.length === 0) {
                cartContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
                if (proceedToPaymentBtn) proceedToPaymentBtn.classList.add('disabled');
                if (totalAmountEl) totalAmountEl.textContent = utils.formatPrice(0);
                return;
            }
            
            if (proceedToPaymentBtn) proceedToPaymentBtn.classList.remove('disabled');
            
            cartItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('order-item');
                
                // Calculate item subtotal
                let itemSubtotal = item.price;
                let addOnsHtml = '';
                
                // Check if addons exists and has items
                if (item.addons && item.addons.length > 0) {
                    addOnsHtml = '<div class="item-addons">';
                    item.addons.forEach(addon => {
                        addOnsHtml += `<p class="item-addon">+ ${addon.name} (${utils.formatPrice(addon.price)})</p>`;
                        itemSubtotal += addon.price;
                    });
                    addOnsHtml += '</div>';
                }
                
                // Multiply by quantity
                const itemTotal = itemSubtotal * item.quantity;
                total += itemTotal;
                
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="item-img">
                    <div class="item-details">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-quantity">Quantity: ${item.quantity}</p>
                        ${addOnsHtml}
                    </div>
                    <div class="item-price">${utils.formatPrice(itemTotal)}</div>
                    <button class="remove-btn" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                
                cartContainer.appendChild(cartItem);
            });
            
            if (totalAmountEl) totalAmountEl.textContent = utils.formatPrice(total);
            
            // Save total to localStorage for payment page
            localStorage.setItem('cartTotal', total.toFixed(2));
            
            // Attach event listeners to remove buttons
            this.attachRemoveHandlers();
        },
        
        attachRemoveHandlers: function() {
            const removeButtons = document.querySelectorAll('.remove-btn');
            const self = this;
            
            removeButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    self.removeCartItem(index);
                });
            });
        },
        
        removeCartItem: function(index) {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            
            if (index >= 0 && index < cartItems.length) {
                cartItems.splice(index, 1);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                // Reload the cart
                const cartContainer = document.querySelector('.cart-items');
                const totalAmountEl = document.querySelector('.total-amount');
                const proceedToPaymentBtn = document.querySelector('.pay-btn');
                this.loadCart(cartContainer, totalAmountEl, proceedToPaymentBtn);
            }
        }
    };
    
    // Payment page functionality
    const paymentPage = {
        init: function() {
            // Check if we're on the payment page
            if (!document.querySelector('.payment-container')) return;
            
            // Generate order/queue number on page load
            const orderNumber = utils.generateOrderNumber();
            const queueNumberEl = document.getElementById('queue-number');
            if (queueNumberEl) queueNumberEl.textContent = orderNumber;
            
            // Handle payment method selection
            const paymentMethods = document.querySelectorAll('.payment-method');
            let selectedPaymentMethod = 'Cash'; // Default payment method
            
            // Add click event to payment methods
            paymentMethods.forEach(method => {
                method.addEventListener('click', function() {
                    // Remove active class from all methods
                    paymentMethods.forEach(m => m.classList.remove('active'));
                    
                    // Add active class to clicked method
                    this.classList.add('active');
                    
                    // Store selected method
                    selectedPaymentMethod = this.getAttribute('data-method');
                    
                    // Visual feedback - scale effect
                    this.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                    
                    // Save to localStorage
                    localStorage.setItem('selectedPaymentMethod', selectedPaymentMethod);
                    
                    console.log('Selected payment method:', selectedPaymentMethod);
                });
            });
            
            // Handle pickup/delivery radio buttons and styling
            const pickupOptions = document.querySelectorAll('.pickup-option');
            const radios = document.querySelectorAll('input[name="delivery"]');
            
            // Add click event to the entire pickup option div
            pickupOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // Find the radio button inside this option
                    const radio = this.querySelector('input[type="radio"]');
                    if (radio) {
                        // Check the radio button
                        radio.checked = true;
                        
                        // Update active class
                        pickupOptions.forEach(opt => opt.classList.remove('active'));
                        this.classList.add('active');
                        
                        // Update pickup time visibility
                        paymentPage.updatePickupTimeVisibility(radios);
                        
                        // Save selected delivery method
                        localStorage.setItem('deliveryMethod', radio.id);
                    }
                });
            });
            
            // Also handle direct radio button changes
            radios.forEach(radio => {
                radio.addEventListener('change', function() {
                    // Update active class
                    pickupOptions.forEach(opt => opt.classList.remove('active'));
                    this.closest('.pickup-option').classList.add('active');
                    
                    // Update pickup time visibility
                    paymentPage.updatePickupTimeVisibility(radios);
                    
                    // Save selected delivery method
                    localStorage.setItem('deliveryMethod', this.id);
                });
            });
            
            // Initialize pickup option state
            this.updatePickupTimeVisibility(radios);
            
            // Set current date
            const dateEl = document.getElementById('payment-date');
            if (dateEl) dateEl.textContent = utils.getCurrentFormattedDate();
            
            // Load order items from localStorage
            const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
            const orderItemsContainer = document.getElementById('order-items-container');
            let totalAmount = 0;
            
            // If no order items found, check cart items
            if (orderItems.length === 0) {
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                if (cartItems.length > 0 && orderItemsContainer) {
                    // Use cart items instead
                    this.renderOrderItems(cartItems, orderItemsContainer, totalAmount);
                } else if (orderItemsContainer) {
                    // No items found, show message
                    orderItemsContainer.innerHTML = '<p>No items in your order.</p>';
                }
            } else if (orderItemsContainer) {
                // Render order items
                this.renderOrderItems(orderItems, orderItemsContainer, totalAmount);
            }
            
            // Handle place order button
            const placeOrderBtn = document.getElementById('place-order-btn');
            const orderPopup = document.getElementById('order-confirmation-popup');
            
            if (placeOrderBtn && orderPopup) {
                placeOrderBtn.addEventListener('click', function(e) {
                    // Prevent default behavior
                    e.preventDefault();
                    
                    console.log('Place order button clicked'); // Debug log
                    
                    // Get order details
                    const orderItems = JSON.parse(localStorage.getItem('orderItems')) || JSON.parse(localStorage.getItem('cartItems')) || [];
                    
                    // If no items, show error and return
                    if (orderItems.length === 0) {
                        alert('Please add items to your order before proceeding.');
                        return;
                    }
                    
                    // Use the same order number that was generated on page load
                    const orderNumber = document.getElementById('queue-number').textContent;
                    const popupOrderNumber = document.getElementById('popup-order-number');
                    if (popupOrderNumber) popupOrderNumber.textContent = orderNumber;
                    
                    // Get total amount from the page
                    const totalAmountEl = document.getElementById('total-amount');
                    const totalAmount = totalAmountEl ? 
                        parseFloat(totalAmountEl.textContent.replace('₱', '')) : 
                        parseFloat(localStorage.getItem('cartTotal') || '0');
                    
                    // Create order object
                    const orderDetails = {
                        orderNumber: orderNumber,
                        items: orderItems,
                        paymentMethod: selectedPaymentMethod,
                        deliveryMethod: document.querySelector('input[name="delivery"]:checked').id,
                        note: document.querySelector('.note-field')?.value || '',
                        total: totalAmount,
                        date: utils.getCurrentFormattedDate(),
                        status: 'preparing',
                        estimatedTime: document.querySelector('input[name="delivery"]:checked').id === 'pickup' ? '3-5' : '15-20',
                        orderTime: new Date().toISOString()
                    };
                    
                    // Save order details for tracking page
                    localStorage.setItem('currentOrder', JSON.stringify(orderDetails));
                    
                    // Add notification for order placed
                    notificationsSystem.addNotification({
                        title: 'Order Placed',
                        message: `Your order #${orderNumber} has been placed successfully.`,
                        type: 'order',
                        icon: 'fas fa-receipt'
                    });
                    
                    // Clear cart after order is placed
                    localStorage.removeItem('cartItems');
                    
                    // Show popup
                    orderPopup.classList.add('active');
                    console.log('Popup should be visible now'); // Debug log
                });
            }
            
            // Check if there's a previously selected payment method
            const savedPaymentMethod = localStorage.getItem('selectedPaymentMethod');
            if (savedPaymentMethod) {
                // Find and activate the saved payment method
                paymentMethods.forEach(method => {
                    if (method.getAttribute('data-method') === savedPaymentMethod) {
                        // Remove active class from all methods
                        paymentMethods.forEach(m => m.classList.remove('active'));
                        // Add active class to this method
                        method.classList.add('active');
                        selectedPaymentMethod = savedPaymentMethod;
                    }
                });
            }
            
            // Check if there's a previously selected delivery method
            const savedDeliveryMethod = localStorage.getItem('deliveryMethod');
            if (savedDeliveryMethod) {
                // Find and activate the saved delivery method
                radios.forEach(radio => {
                    if (radio.id === savedDeliveryMethod) {
                        radio.checked = true;
                        
                        // Update active class
                        pickupOptions.forEach(opt => opt.classList.remove('active'));
                        radio.closest('.pickup-option').classList.add('active');
                        
                        // Update pickup time visibility
                        this.updatePickupTimeVisibility(radios);
                    }
                });
            }
        },
        
        updatePickupTimeVisibility: function(radios) {
            document.querySelectorAll('.pickup-time').forEach(span => span.style.display = 'none');
            radios.forEach(radio => {
                if (radio.checked) {
                    const timeSpan = radio.parentElement.querySelector('.pickup-time');
                    if (timeSpan) timeSpan.style.display = 'inline';
                }
            });
        },
        
        renderOrderItems: function(items, container, totalAmount) {
            container.innerHTML = ''; // Clear container
            totalAmount = 0; // Reset total
            
            items.forEach(item => {
                // Calculate item total price including addons
                let itemPrice = item.price;
                let addonText = '';
                
                if (item.addons && item.addons.length > 0) {
                    item.addons.forEach(addon => {
                        itemPrice += addon.price;
                        addonText += `<p class="item-addon">+ ${addon.name}</p>`;
                    });
                }
                
                const itemTotal = itemPrice * item.quantity;
                totalAmount += itemTotal;
                
                // Create order item HTML
                const orderItemHTML = `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.name}" class="item-img">
                        <div class="item-details">
                            <h3 class="item-name">${item.name}</h3>
                            <p class="item-quantity">Quantity: ${item.quantity}</p>
                            ${addonText}
                        </div>
                        <div class="item-price">${utils.formatPrice(itemTotal)}</div>
                    </div>
                `;
                
                container.innerHTML += orderItemHTML;
            });
            
            // Update total amount
            const totalAmountEl = document.getElementById('total-amount');
            if (totalAmountEl) totalAmountEl.textContent = utils.formatPrice(totalAmount);
        }
    };
    
    // Order tracking page functionality
    const orderTrackingPage = {
        init: function() {
            // Check if we're on the order tracking page
            if (!document.querySelector('.tracking-container')) return;
            
            // Load order details from localStorage
            const currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
            
            if (!currentOrder) {
                // No order found, redirect to home
                window.location.href = 'home.html';
                return;
            }
            
            // Update order number
            const orderNumberEl = document.getElementById('order-number');
            if (orderNumberEl) orderNumberEl.textContent = `Order/Queue #${currentOrder.orderNumber}`;
            
            // Update estimated time
            const estimatedMinutesEl = document.getElementById('estimated-minutes');
            if (estimatedMinutesEl) estimatedMinutesEl.textContent = currentOrder.estimatedTime;
            
            // Update order status
            const orderStatus = document.getElementById('order-status');
            if (orderStatus) orderStatus.textContent = utils.capitalizeFirstLetter(currentOrder.status);
            
            // Update progress bar based on status
            this.updateProgressBar(currentOrder.status);
            
            // Update order details
            const orderDateEl = document.getElementById('order-date');
            if (orderDateEl) orderDateEl.textContent = currentOrder.date;
            
            const paymentMethodEl = document.getElementById('payment-method');
            if (paymentMethodEl) paymentMethodEl.textContent = currentOrder.paymentMethod;
            
            const pickupMethodEl = document.getElementById('pickup-method');
            if (pickupMethodEl) {
                pickupMethodEl.textContent = currentOrder.deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery';
            }
            
            const orderTotalEl = document.getElementById('order-total');
            if (orderTotalEl) orderTotalEl.textContent = utils.formatPrice(currentOrder.total);
            
            // Show note if provided
            if (currentOrder.note && currentOrder.note.trim() !== '') {
                const orderNoteEl = document.getElementById('order-note');
                const noteRowEl = document.getElementById('note-row');
                
                if (orderNoteEl) orderNoteEl.textContent = currentOrder.note;
                if (noteRowEl) noteRowEl.style.display = 'flex';
            }
            
            // Render order items
            const trackingOrderItemsEl = document.getElementById('tracking-order-items');
            if (trackingOrderItemsEl) this.renderOrderItems(currentOrder.items, trackingOrderItemsEl);
            
            // Simulate order progress (for demo purposes)
            this.simulateOrderProgress(currentOrder);
            
            // Support button click
            const supportBtn = document.getElementById('support-btn');
            if (supportBtn) {
                supportBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('Support feature will be implemented in a future update.');
                });
            }
        },
        
        updateProgressBar: function(status) {
            const progressBar = document.getElementById('progress-bar');
            const step1 = document.getElementById('step-1');
            const step2 = document.getElementById('step-2');
            const step3 = document.getElementById('step-3');
            const step4 = document.getElementById('step-4');
            
            if (!progressBar || !step1 || !step2 || !step3 || !step4) return;
            
            // Reset all steps
            [step1, step2, step3, step4].forEach(step => {
                step.classList.remove('active', 'completed');
            });
            
            // Set progress based on status
            switch(status) {
                case 'placed':
                    step1.classList.add('active');
                    progressBar.style.width = '0%';
                    break;
                case 'preparing':
                    step1.classList.add('completed');
                    step2.classList.add('active');
                    progressBar.style.width = '33%';
                    break;
                case 'ready':
                    step1.classList.add('completed');
                    step2.classList.add('completed');
                    step3.classList.add('active');
                    progressBar.style.width = '66%';
                    break;
                case 'completed':
                    step1.classList.add('completed');
                    step2.classList.add('completed');
                    step3.classList.add('completed');
                    step4.classList.add('active');
                    progressBar.style.width = '100%';
                    break;
                default:
                    step1.classList.add('active');
                    progressBar.style.width = '0%';
            }
        },
        
        renderOrderItems: function(items, container) {
            container.innerHTML = '';
            
            items.forEach(item => {
                // Calculate item total price including addons
                let itemPrice = item.price;
                let addonText = '';
                
                if (item.addons && item.addons.length > 0) {
                    item.addons.forEach(addon => {
                        itemPrice += addon.price;
                        addonText += `${addon.name}, `;
                    });
                    // Remove trailing comma and space
                    addonText = addonText.slice(0, -2);
                }
                
                const itemTotal = itemPrice * item.quantity;
                
                // Create order item HTML
                const orderItemHTML = `
                    <div class="order-item">
                        <div class="item-quantity">x${item.quantity}</div>
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            ${addonText ? `<div class="item-addons">Add-ons: ${addonText}</div>` : ''}
                        </div>
                        <div class="item-price">${utils.formatPrice(itemTotal)}</div>
                    </div>
                `;
                
                container.innerHTML += orderItemHTML;
            });
        },
        
        simulateOrderProgress: function(currentOrder) {
            // This is just for demo purposes to show the progress changing
            // In a real app, this would be updated via server/API
            
            // Only simulate if the order is in 'preparing' status
            if (currentOrder.status !== 'preparing') return;
            
            const orderStatus = document.getElementById('order-status');
            if (!orderStatus) return;
            
            // Simulate progress after 10 seconds
            setTimeout(() => {
                currentOrder.status = 'ready';
                orderStatus.textContent = 'Ready for Pickup';
                this.updateProgressBar('ready');
                localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
                
                // Simulate completion after another 10 seconds
                setTimeout(() => {
                    currentOrder.status = 'completed';
                    orderStatus.textContent = 'Completed';
                    this.updateProgressBar('completed');
                    localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
                }, 10000);
                
            }, 10000);
        }
    };
    
    // Add keyframes for heart beat animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartBeat {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize all page functionality
    userProfile.init();
    homePage.init();
    productDetailPage.init();
    orderDetailsPage.init();
    paymentPage.init();
    orderTrackingPage.init();
    favoritesSystem.init(); // Initialize favorites system
    notificationsSystem.init(); // Initialize notifications system
});