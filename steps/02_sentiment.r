library(plyr)
library(stringr)

pos <- scan('positive.txt', what='character', sep='\n')
neg <- scan('negative.txt', what='character', sep='\n')

sentiment <- function(sentences, ref.words)
{
    sentences <- iconv(sentences, 'UTF-8', 'ASCII', ' ')
    # we got a vector of sentences. plyr will handle a list or a vector as an "l" for us
    # we want a simple array of scores back, so we use "l" + "a" + "ply" = laply:
    return(laply(sentences, function(sentence, ref.words) {
        # clean up sentences with R's regex-driven global substitute, gsub():
        sentence = gsub('[[:punct:]]', '', sentence)
    sentence = gsub('[[:cntrl:]]', '', sentence)
    sentence = gsub('\\d+', '', sentence)
    # and convert to lower case:
        sentence = tolower(sentence)
        # split into words. str_split is in the stringr package
        word.list = str_split(sentence, '\\s+')
        # sometimes a list() is one level of hierarchy too much
        words = unlist(word.list)
        # compare our words to the dictionaries of positive & negative terms
        return(sum(!is.na(match(words, ref.words))))
    }, ref.words))
}