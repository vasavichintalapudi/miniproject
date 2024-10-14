const parties = [
    { name: 'BJP Party', image: 'Images.png/bjp.jpeg', votes: 0 },
    { name: 'Congress Party', image: 'Images.png/congress.png', votes: 0 },
    { name: 'TDP Party', image: 'Images.png/tdp1.jpeg', votes: 0 },
];

// Load saved votes from localStorage
const loadVotes = () => {
    const savedVotes = localStorage.getItem('votes');
    if (savedVotes) {
        const parsedVotes = JSON.parse(savedVotes);
        parsedVotes.forEach((vote, index) => {
            if (parties[index]) {
                parties[index].votes = vote;
            }
        });
    }
};

// Handle user login
document.getElementById('loginBtn')?.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    
    if (username) {
        localStorage.setItem('username', username);
        window.location.href = 'miniproj2.html';
    } else {
        document.getElementById('errorMsg').innerText = 'Please enter a username!';
    }
});

// Render party options
const renderPartyOptions = () => {
    const partyOptionsDiv = document.getElementById('partyOptions');
    parties.forEach((party, index) => {
        const partyDiv = document.createElement('div');
        partyDiv.classList.add('party-option');
        partyDiv.innerHTML = `
            <img src="${party.image}" alt="${party.name}">
            <div>${party.name}</div>
        `;
        
        // Event listener for selecting a party
        partyDiv.addEventListener('click', () => {
            document.querySelectorAll('.party-option').forEach(opt => opt.classList.remove('selected'));
            partyDiv.classList.add('selected');
            document.getElementById('selectedParty').innerText = `You selected: ${party.name}`;
            selectedPartyIndex = index; 
        });

        partyOptionsDiv.appendChild(partyDiv);
    });
};

let selectedPartyIndex = null;

// Submit vote
document.getElementById('submitVoteBtn')?.addEventListener('click', () => {
    if (selectedPartyIndex !== null) {
        // Increment votes for the selected party
        parties[selectedPartyIndex].votes++;

        // Save updated votes to localStorage
        localStorage.setItem('votes', JSON.stringify(parties.map(p => p.votes)));

        const username = localStorage.getItem('username');
        document.getElementById('voteMessage').innerText = `${username}, you voted for ${parties[selectedPartyIndex].name}!`;
    } else {
        document.getElementById('voteMessage').innerText = 'Please select a party to vote!';
    }
});

// View results
document.getElementById('viewResultsBtn')?.addEventListener('click', () => {
    window.location.href = 'results.html';
});

// Load polls if on polling page
if (document.getElementById('partyOptions')) {
    loadVotes();
    renderPartyOptions();
}

// Display results if on results page
if (document.getElementById('results')) {
    const resultsDiv = document.getElementById('results');
    loadVotes(); // Load saved votes

    parties.forEach(party => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        resultDiv.innerText = `${party.name}: ${party.votes} votes`;
        resultsDiv.appendChild(resultDiv);
    });
}

// Back button to return to poll page
document.getElementById('backBtn')?.addEventListener('click', () => {
    window.location.href = 'miniproj2.html';
});