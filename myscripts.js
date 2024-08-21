// JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const publicationCards = document.querySelectorAll('.publication-card');
    const topicButtonsContainer = document.getElementById('topic-buttons');
    const venueButtonsContainer = document.getElementById('venue-buttons');

    // Collect unique topics and venues
    let uniqueTopics = new Set();
    let uniqueVenues = new Set();
    publicationCards.forEach(card => {
        const tags = card.getAttribute('data-tags').split(',');
        tags.forEach(tag => uniqueTopics.add(tag.trim()));
        uniqueVenues.add(card.querySelector('.venue-tag').textContent.trim());
    });

    // Create filter buttons for topics
    createFilterButton('all-topics', 'All Topics', topicButtonsContainer);
    uniqueTopics.forEach(topic => {
        createFilterButton(`tag-${topic}`, topic, topicButtonsContainer);
    });

    // Create filter buttons for venues
    createFilterButton('all-venues', 'All Venues', venueButtonsContainer);
    uniqueVenues.forEach(venue => {
        createFilterButton(`venue-${venue}`, venue, venueButtonsContainer);
    });

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        const filterGroup = btn.closest('.filter-group');
        const isTopicFilter = filterGroup.querySelector('h4').textContent === 'Topic';

        // Remove active class from all buttons in this group
        filterGroup.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        // Automatic Reset Logic
        if (isTopicFilter) {
            // If a topic filter is clicked, reset venue filters to "All Venues"
            document.querySelector('[data-filter="all-venues"]').classList.add('active');
            document.querySelectorAll('[data-filter^="venue-"]').forEach(b => {
                if (b !== btn) b.classList.remove('active');
            });
        } else {
            // If a venue filter is clicked, reset topic filters to "All Topics"
            document.querySelector('[data-filter="all-topics"]').classList.add('active');
            document.querySelectorAll('[data-filter^="tag-"]').forEach(b => {
                if (b !== btn) b.classList.remove('active');
            });
        }

        if (filter === 'all-years' || filter === 'all-topics' || filter === 'all-venues') {
            // If "All" is selected, show all cards
            publicationCards.forEach(card => card.style.display = 'block');
        } else if (filter.startsWith('tag-')) {
            const tag = filter.replace('tag-', '');
            publicationCards.forEach(card => {
                const cardTags = card.getAttribute('data-tags').split(',');
                card.style.display = cardTags.includes(tag) ? 'block' : 'none';
            });
        } else if (filter.startsWith('venue-')) {
            const venue = filter.replace('venue-', '').toUpperCase();
            publicationCards.forEach(card => {
                const cardVenue = card.querySelector('.venue-tag').textContent.toUpperCase();
                card.style.display = cardVenue.includes(venue) ? 'block' : 'none';
            });
        } else {
            // Year filter
            publicationCards.forEach(card => {
                card.style.display = card.getAttribute('data-year') === filter ? 'block' : 'none';
            });
        }
    });
});

    publicationCards.forEach(card => {
        const tagsContainer = card.querySelector('.tags');
        const tags = card.getAttribute('data-tags').split(',');
        tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.classList.add('tag');
            tagSpan.textContent = tag.trim();
            tagsContainer.appendChild(tagSpan);
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function createFilterButton(dataFilter, textContent, container) {
        const button = document.createElement('button');
        button.classList.add('filter-btn');
        button.setAttribute('data-filter', dataFilter);
        button.textContent = textContent;
        container.appendChild(button);
    }
document.querySelector('[data-filter="all-topics"]').classList.add('active');
document.querySelector('[data-filter="all-venues"]').classList.add('active');
});
