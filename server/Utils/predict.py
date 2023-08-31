with open('defaultdict_file.pkl', 'rb') as f:
    model = pickle.load(f)

# Function to predict the next word given the previous words
def predict_next_word(prev_words):
    prev_ngram = tuple(prev_words)
    candidates = []
    for ngram, prob in model.items():
        if ngram[:-1] == prev_ngram:
            candidates.append((ngram[-1]))
    # candidates.sort(key=lambda x: x[1], reverse=True)
    return candidates if candidates else None


# Function to predict the next word given the previous words
def predict_next_word(prev_words):
    prev_ngram = tuple(prev_words)
    candidates = []
    for ngram, prob in model.items():
        if ngram[:-1] == prev_ngram:
            candidates.append((ngram[-1]))
    candidates.sort(key=lambda x: x[1], reverse=True)
    return candidates if candidates else None #change prob = probability

# Example prediction
prev_words = ['விலை']
next_word = predict_next_word(prev_words)

print('Previous words:', prev_words)
print('Predicted next word:', next_word)