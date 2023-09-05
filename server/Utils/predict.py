import pickle

# model to predict with two words
with open('.././Model/IT20167578/defaultdict_file.pkl', 'rb') as f:
    model_two = pickle.load(f)

# model to predict with one words
with open('.././Model/IT20167578/defaultdict_file_1.pkl', 'rb') as f:
    model_one = pickle.load(f)


# Function to predict the next word given the previous two words
def predict_next_word_two(prev_words):
    prev_ngram = tuple(prev_words)
    candidates = []
    for ngram, prob in model_two.items():
        if ngram[:-1] == prev_ngram:
            candidates.append((ngram[-1], prob))
    candidates.sort(key=lambda x: x[1], reverse=True)
    return candidates if candidates else None

# Function to predict the next word given the previous one word
def predict_next_word_one(prev_words):
    prev_ngram = tuple(prev_words)
    candidates = []
    for ngram, prob in model_one.items():
        if ngram[:-1] == prev_ngram:
            candidates.append((ngram[-1], prob))
    candidates.sort(key=lambda x: x[1], reverse=True)
    return candidates if candidates else None


def predict_one(words):
    data = predict_next_word_one(words)
    if data is not None:
        data = [sublist[0] for sublist in data[:10]]
    return data


def predict_two(words):
    data = predict_next_word_two(words)
    if data is not None:
        data = [sublist[0] for sublist in data[:10]]
    return data
