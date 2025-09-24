// HiddenIndia Static Prototype - Advanced JavaScript

class HiddenIndiaApp {
  constructor() {
    this.currentPage = "home"
    this.currentUser = null
    this.userType = null // 'tourist' or 'guide'
    this.destinations = []
    this.badges = []

    this.init()
  }

  init() {
    this.loadData()
    this.setupEventListeners()
    this.setupNavigation()
    this.setupAuthentication()
    this.setupDashboards()
    this.setupBadges()
    this.setupModals()
    this.setupFilters()
    this.setupMobileMenu()

    // Show home page by default
    this.showPage("home")

    console.log("[v0] HiddenIndia app initialized successfully")
  }

  loadData() {
    // Sample destinations data
    this.destinations = [
      {
        id: 1,
        name: "Secret Waterfalls of Meghalaya",
        description: "Hidden cascades nestled in untouched forests, known only to local tribes.",
        category: "forests",
        image: "meghalaya-secret-waterfall.jpg",
        guide: "Ravi Khasi",
        rating: 4.9,
        price: 3500,
        duration: "3 days",
      },
      {
        id: 2,
        name: "Ancient Villages of Kinnaur",
        description: "Discover 1000-year-old settlements in the high Himalayas with traditional architecture.",
        category: "mountains",
        image: "kinnaur-ancient-mountain-village.jpg",
        guide: "Tenzin Negi",
        rating: 4.8,
        price: 4200,
        duration: "4 days",
      },
      {
        id: 3,
        name: "Lost Temples of Hampi Outskirts",
        description: "Unexplored ruins and temples beyond the famous Hampi circuit.",
        category: "cultural",
        image: "hidden-hampi-temple-ruins.jpg",
        guide: "Lakshmi Devi",
        rating: 4.7,
        price: 2800,
        duration: "2 days",
      },
      {
        id: 4,
        name: "Secret Beaches of Gokarna",
        description: "Pristine coastline accessible only by boat or hidden trails.",
        category: "coastal",
        image: "gokarna-secret-beach.jpg",
        guide: "Suresh Naik",
        rating: 4.9,
        price: 3200,
        duration: "3 days",
      },
      {
        id: 5,
        name: "Monastery Trail in Spiti",
        description: "Ancient monasteries connected by forgotten paths in the high desert.",
        category: "spiritual",
        image: "spiti-hidden-monastery.jpg",
        guide: "Lobsang Dorje",
        rating: 4.8,
        price: 5000,
        duration: "5 days",
      },
      {
        id: 6,
        name: "Tribal Villages of Bastar",
        description: "Experience authentic tribal culture in remote Chhattisgarh villages.",
        category: "cultural",
        image: "bastar-tribal-village.jpg",
        guide: "Mangal Singh",
        rating: 4.6,
        price: 3800,
        duration: "4 days",
      },
    ]

    // Load featured destinations (first 3)
    this.loadFeaturedDestinations()
    this.loadAllDestinations()
  }

  setupEventListeners() {
    // Navigation clicks
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-page]")) {
        e.preventDefault()
        const page = e.target.getAttribute("data-page")
        this.showPage(page)
      }
    })

    // Form submissions
    document.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleFormSubmission(e)
    })

    // Tab switches
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-tab]")) {
        this.switchTab(e)
      }
    })

    // Dashboard navigation
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-section]")) {
        this.switchDashboardSection(e)
      }
    })

    // Logout buttons
    document.getElementById("logout-btn")?.addEventListener("click", () => {
      this.logout()
    })
    document.getElementById("guide-logout-btn")?.addEventListener("click", () => {
      this.logout()
    })
  }

  setupNavigation() {
    // Update navbar based on authentication state
    this.updateNavbar()
  }

  setupAuthentication() {
    // Auth tab switching
    const authTabs = document.querySelectorAll(".auth-tab")
    authTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabId = tab.getAttribute("data-tab")
        this.switchAuthTab(tabId)
      })
    })
  }

  setupDashboards() {
    // Dashboard section navigation
    const navItems = document.querySelectorAll(".nav-item")
    navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault()
        const section = item.getAttribute("data-section")
        this.showDashboardSection(section)
      })
    })
  }

  setupBadges() {
    // Badges tab switching
    const badgeTabs = document.querySelectorAll(".badge-tab")
    badgeTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabId = tab.getAttribute("data-tab")
        this.switchBadgeTab(tabId)
      })
    })
  }

  setupModals() {
    const modalOverlay = document.getElementById("modal-overlay")
    const modalClose = document.querySelector(".modal-close")

    // Close modal on overlay click
    modalOverlay?.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        this.closeModal()
      }
    })

    // Close modal on close button
    modalClose?.addEventListener("click", () => {
      this.closeModal()
    })

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal()
      }
    })
  }

  setupFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn")
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter")
        this.filterDestinations(filter)

        // Update active filter button
        filterBtns.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
      })
    })
  }

  setupMobileMenu() {
    const navToggle = document.getElementById("nav-toggle")
    const navMenu = document.getElementById("nav-menu")

    navToggle?.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
      })
    })
  }

  showPage(pageId) {
    console.log(`[v0] Navigating to page: ${pageId}`)

    // Hide all pages
    const pages = document.querySelectorAll(".page")
    pages.forEach((page) => page.classList.remove("active"))

    // Show target page
    const targetPage = document.getElementById(`${pageId}-page`)
    if (targetPage) {
      targetPage.classList.add("active")
      this.currentPage = pageId

      // Update navbar active state
      this.updateNavbarActive()

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      console.warn(`[v0] Page not found: ${pageId}`)
    }
  }

  updateNavbar() {
    const navbar = document.getElementById("navbar")
    const navMenu = document.getElementById("nav-menu")

    if (this.currentUser) {
      // User is logged in, show dashboard links
      const dashboardLink = this.userType === "tourist" ? "tourist-dashboard" : "guide-dashboard"
      // Update navigation to show user-specific options
    }
  }

  updateNavbarActive() {
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      const linkPage = link.getAttribute("data-page")
      if (linkPage === this.currentPage) {
        link.classList.add("active")
      } else {
        link.classList.remove("active")
      }
    })
  }

  handleFormSubmission(e) {
    const form = e.target
    const formId = form.id

    console.log(`[v0] Form submitted: ${formId}`)

    switch (formId) {
      case "tourist-login-form":
        this.handleTouristLogin(form)
        break
      case "tourist-signup-form":
        this.handleTouristSignup(form)
        break
      case "guide-login-form":
        this.handleGuideLogin(form)
        break
      case "guide-signup-form":
        this.handleGuideSignup(form)
        break
      default:
        console.log(`[v0] Unhandled form: ${formId}`)
    }
  }

  handleTouristLogin(form) {
    const email = form.querySelector("#tourist-email").value
    const password = form.querySelector("#tourist-password").value

    // Simulate login
    this.currentUser = {
      name: "Sarah Johnson",
      email: email,
      type: "tourist",
      avatar: "tourist-profile-avatar.jpg",
    }
    this.userType = "tourist"

    this.showSuccessMessage("Welcome back, Explorer!")
    setTimeout(() => {
      this.showPage("tourist-dashboard")
    }, 1000)
  }

  handleTouristSignup(form) {
    const name = form.querySelector("#tourist-name").value
    const email = form.querySelector("#tourist-signup-email").value

    // Simulate signup
    this.currentUser = {
      name: name,
      email: email,
      type: "tourist",
      avatar: "tourist-profile-avatar.jpg",
    }
    this.userType = "tourist"

    // Update dashboard with user name
    const nameDisplay = document.getElementById("tourist-name-display")
    if (nameDisplay) nameDisplay.textContent = name

    this.showSuccessMessage("Account created successfully!")
    setTimeout(() => {
      this.showPage("tourist-dashboard")
    }, 1000)
  }

  handleGuideLogin(form) {
    const email = form.querySelector("#guide-email").value
    const password = form.querySelector("#guide-password").value

    // Simulate login
    this.currentUser = {
      name: "Rajesh Kumar",
      email: email,
      type: "guide",
      avatar: "indian-guide-profile-avatar.jpg",
    }
    this.userType = "guide"

    this.showSuccessMessage("Welcome back, Guide!")
    setTimeout(() => {
      this.showPage("guide-dashboard")
    }, 1000)
  }

  handleGuideSignup(form) {
    const name = form.querySelector("#guide-name").value
    const email = form.querySelector("#guide-signup-email").value
    const location = form.querySelector("#guide-location").value

    // Simulate signup
    this.currentUser = {
      name: name,
      email: email,
      type: "guide",
      location: location,
      avatar: "indian-guide-profile-avatar.jpg",
    }
    this.userType = "guide"

    // Update dashboard with user name
    const nameDisplay = document.getElementById("guide-name-display")
    if (nameDisplay) nameDisplay.textContent = name

    this.showSuccessMessage("Guide account created successfully!")
    setTimeout(() => {
      this.showPage("guide-dashboard")
    }, 1000)
  }

  logout() {
    this.currentUser = null
    this.userType = null
    this.showSuccessMessage("Logged out successfully!")
    setTimeout(() => {
      this.showPage("home")
    }, 1000)
  }

  switchTab(e) {
    const tabId = e.target.getAttribute("data-tab")
    const parentContainer = e.target.closest(".auth-container")

    // Update tab buttons
    const tabs = parentContainer.querySelectorAll(".auth-tab")
    tabs.forEach((tab) => tab.classList.remove("active"))
    e.target.classList.add("active")

    // Update form visibility
    const forms = parentContainer.querySelectorAll(".auth-form")
    forms.forEach((form) => form.classList.remove("active"))

    const targetForm = document.getElementById(tabId)
    if (targetForm) {
      targetForm.classList.add("active")
    }
  }

  switchAuthTab(tabId) {
    // Handle auth tab switching with animation
    const container = document.querySelector(".auth-container")
    container.style.transform = "scale(0.95)"

    setTimeout(() => {
      const targetForm = document.getElementById(tabId)
      if (targetForm) {
        const forms = document.querySelectorAll(".auth-form")
        forms.forEach((form) => form.classList.remove("active"))
        targetForm.classList.add("active")
      }
      container.style.transform = "scale(1)"
    }, 150)
  }

  switchDashboardSection(e) {
    const section = e.target.getAttribute("data-section")
    this.showDashboardSection(section)
  }

  showDashboardSection(sectionId) {
    // Update navigation
    const navItems = document.querySelectorAll(".nav-item")
    navItems.forEach((item) => item.classList.remove("active"))

    const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`)
    if (activeNavItem) {
      activeNavItem.classList.add("active")
    }

    // Update sections
    const sections = document.querySelectorAll(".dashboard-section")
    sections.forEach((section) => section.classList.remove("active"))

    const targetSection = document.getElementById(`${sectionId}-section`)
    if (targetSection) {
      targetSection.classList.add("active")
    }
  }

  switchBadgeTab(tabId) {
    // Update tab buttons
    const badgeTabs = document.querySelectorAll(".badge-tab")
    badgeTabs.forEach((tab) => tab.classList.remove("active"))

    const activeTab = document.querySelector(`[data-tab="${tabId}"]`)
    if (activeTab) {
      activeTab.classList.add("active")
    }

    // Update sections
    const badgeSections = document.querySelectorAll(".badges-section")
    badgeSections.forEach((section) => section.classList.remove("active"))

    const targetSection = document.getElementById(tabId)
    if (targetSection) {
      targetSection.classList.add("active")
    }
  }

  loadFeaturedDestinations() {
    const container = document.getElementById("featured-destinations")
    if (!container) return

    const featuredDestinations = this.destinations.slice(0, 3)
    container.innerHTML = featuredDestinations.map((dest) => this.createDestinationCard(dest)).join("")
  }

  loadAllDestinations() {
    const container = document.getElementById("all-destinations")
    if (!container) return

    container.innerHTML = this.destinations.map((dest) => this.createDestinationCard(dest, true)).join("")
  }

  createDestinationCard(destination, showBookButton = false) {
    return `
            <div class="destination-card" data-destination-id="${destination.id}">
                <img src="${destination.image}" alt="${destination.name}" class="destination-image">
                <div class="destination-content">
                    <h3>${destination.name}</h3>
                    <p>${destination.description}</p>
                    <div class="destination-footer">
                        <span class="destination-category">${this.formatCategory(destination.category)}</span>
                        <div class="destination-meta">
                            <span class="rating">
                                <i class="fas fa-star"></i> ${destination.rating}
                            </span>
                            <span class="price">₹${destination.price}</span>
                        </div>
                    </div>
                    <div class="destination-actions" style="margin-top: 1rem;">
                        <button class="btn btn-outline" onclick="window.app.showDestinationModal(${destination.id})">
                            View Details
                        </button>
                        ${
                          showBookButton
                            ? `
                            <button class="btn btn-primary" onclick="window.app.bookGuide(${destination.id})">
                                Book Guide
                            </button>
                        `
                            : ""
                        }
                    </div>
                </div>
            </div>
        `
  }

  formatCategory(category) {
    const categories = {
      mountains: "Mountains",
      cultural: "Cultural",
      forests: "Forests",
      coastal: "Coastal",
      spiritual: "Spiritual",
    }
    return categories[category] || category
  }

  filterDestinations(filter) {
    const container = document.getElementById("all-destinations")
    if (!container) return

    let filteredDestinations = this.destinations

    if (filter !== "all") {
      filteredDestinations = this.destinations.filter((dest) => dest.category === filter)
    }

    // Add loading animation
    container.style.opacity = "0.5"

    setTimeout(() => {
      container.innerHTML = filteredDestinations.map((dest) => this.createDestinationCard(dest, true)).join("")
      container.style.opacity = "1"
    }, 300)
  }

  showDestinationModal(destinationId) {
    const destination = this.destinations.find((d) => d.id === destinationId)
    if (!destination) return

    const modal = document.getElementById("destination-modal")
    const modalTitle = document.getElementById("modal-title")
    const modalBody = document.getElementById("modal-body")
    const modalOverlay = document.getElementById("modal-overlay")

    modalTitle.textContent = destination.name
    modalBody.innerHTML = `
            <div class="modal-destination">
                <img src="${destination.image}" alt="${destination.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                <div class="destination-details">
                    <div class="detail-row">
                        <strong>Guide:</strong> ${destination.guide}
                    </div>
                    <div class="detail-row">
                        <strong>Duration:</strong> ${destination.duration}
                    </div>
                    <div class="detail-row">
                        <strong>Price:</strong> ₹${destination.price} per person
                    </div>
                    <div class="detail-row">
                        <strong>Rating:</strong> 
                        <span class="rating">
                            <i class="fas fa-star"></i> ${destination.rating} (Based on 50+ reviews)
                        </span>
                    </div>
                    <div class="detail-row">
                        <strong>Category:</strong> ${this.formatCategory(destination.category)}
                    </div>
                </div>
                <div class="destination-description" style="margin: 1.5rem 0;">
                    <h4>Experience Description</h4>
                    <p>${destination.description}</p>
                    <p>This unique experience offers you the chance to explore places that most tourists never see. Your local guide will share stories passed down through generations and show you hidden spots that hold special meaning to the local community.</p>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="window.app.bookGuide(${destination.id}); window.app.closeModal();">
                        Book This Experience
                    </button>
                    <button class="btn btn-outline" onclick="window.app.closeModal();">
                        Close
                    </button>
                </div>
            </div>
        `

    modalOverlay.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  closeModal() {
    const modalOverlay = document.getElementById("modal-overlay")
    modalOverlay.classList.remove("active")
    document.body.style.overflow = "auto"
  }

  bookGuide(destinationId) {
    const destination = this.destinations.find((d) => d.id === destinationId)
    if (!destination) return

    if (!this.currentUser) {
      this.showErrorMessage("Please log in to book a guide")
      setTimeout(() => {
        this.showPage("tourist-auth")
      }, 1500)
      return
    }

    // Simulate booking
    this.showSuccessMessage(`Booking request sent to ${destination.guide}!`)

    // Add booking animation
    const bookingBtn = event.target
    const originalText = bookingBtn.textContent
    bookingBtn.textContent = "Booking..."
    bookingBtn.disabled = true

    setTimeout(() => {
      bookingBtn.textContent = "Booked!"
      setTimeout(() => {
        bookingBtn.textContent = originalText
        bookingBtn.disabled = false
      }, 2000)
    }, 1000)
  }

  showSuccessMessage(message) {
    this.showToast(message, "success")
  }

  showErrorMessage(message) {
    this.showToast(message, "error")
  }

  showToast(message, type = "info") {
    // Create toast element
    const toast = document.createElement("div")
    toast.className = `toast toast-${type}`
    toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === "success" ? "#2d5a3d" : type === "error" ? "#d63031" : "#0066cc"};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-weight: 500;
        `
    toast.textContent = message

    document.body.appendChild(toast)

    // Animate in
    setTimeout(() => {
      toast.style.transform = "translateX(0)"
    }, 100)

    // Animate out and remove
    setTimeout(() => {
      toast.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, 3000)
  }

  // Badge animations and interactions
  animateBadgeProgress() {
    const progressBars = document.querySelectorAll(".progress")
    progressBars.forEach((bar) => {
      const width = bar.style.width
      bar.style.width = "0%"
      setTimeout(() => {
        bar.style.width = width
      }, 500)
    })
  }

  // Scroll animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)

    // Observe destination cards and other elements
    const animatedElements = document.querySelectorAll(".destination-card, .testimonial-card, .badge-card")
    animatedElements.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(20px)"
      el.style.transition = "all 0.6s ease"
      observer.observe(el)
    })
  }

  // Smooth scrolling for navigation
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  // Initialize advanced features after DOM load
  initAdvancedFeatures() {
    this.setupScrollAnimations()
    this.setupSmoothScrolling()

    // Add loading states for dynamic content
    const loadingElements = document.querySelectorAll(".destinations-grid")
    loadingElements.forEach((el) => {
      el.addEventListener("DOMSubtreeModified", () => {
        this.setupScrollAnimations()
      })
    })
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.app = new HiddenIndiaApp()

  // Initialize advanced features after a short delay
  setTimeout(() => {
    window.app.initAdvancedFeatures()
  }, 500)
})

// Add some utility functions for enhanced UX
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // ESC to close modals
  if (e.key === "Escape") {
    window.app.closeModal()
  }

  // Quick navigation with Alt + number keys
  if (e.altKey) {
    switch (e.code) {
      case "Digit1":
        e.preventDefault()
        window.app.showPage("home")
        break
      case "Digit2":
        e.preventDefault()
        window.app.showPage("explore")
        break
      case "Digit3":
        e.preventDefault()
        window.app.showPage("badges")
        break
    }
  }
})

// Add performance monitoring
console.log("[v0] HiddenIndia static prototype loaded successfully")
console.log("[v0] Features: Navigation, Authentication (demo), Dashboards, Badges, Filters, Modals, Responsive Design")
