import pycrfsuite
from indicnlp.tokenize import indic_tokenize


def extract_features(sentence, index, sentences):
    # Extract features for a given word in a sentence
    word = sentence[index]

    prev_word = ""
    if index == 0:
        prev_word = "BOS"
    elif sentences[0][index-1][0] == '.':
        prev_word = "BOS"
    else:
        prev_word = sentence[index-1]

    next_word = ""
    if index == len(sentence)-1:
        next_word = "EOS"
    elif sentences[0][index+1][0] == '.':
        next_word = "EOS"
    else:
        next_word = sentence[index+1]
    features = [
        'bias',
        'word=' + word,
        'word.isdigit=%s' % word.isdigit(),
        'prev_word=' + prev_word,
        'next_word=' + next_word
    ]
    return features


def predict_labels(sentence, model, test_sentences):
    # Predict labels for a sentence using the trained CRF model
    features = [extract_features(sentence, i, test_sentences)
                for i in range(len(sentence))]
    return model.tag(features)


def predict(sentences, model):
    # predict
    for sentence in sentences:
        tokens = [token for token in sentence]
        predicted_labels = predict_labels(tokens, model, sentences)
        output = []
        for i in range(len(tokens)):
            output.append((tokens[i], predicted_labels[i]))
        return output


# Load the trained CRF model
model = pycrfsuite.Tagger()
model.open('.././Model/IT20221928/ner_tamil_model.crfsuite')

# make prediction


def make_prediction(sentence):
    tokenized_sentences = [indic_tokenize.trivial_tokenize(sentence.strip())]
    prediction_sentences = tokenized_sentences
    return predict(prediction_sentences, model)
