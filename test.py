import random

# 배열 초기화
rows = 14
cols = 12
board = [['' for _ in range(cols)] for _ in range(rows)]

# 정답 리스트
answers = ['love', 'python', 'javascript']

# 알파벳 리스트
alphabet = 'abcdefghijklmnopqrstuvwxyz'

# 단어를 보드에 배치하는 함수
def place_word(board, word):
    direction = random.choice(['horizontal', 'vertical', 'diagonal'])
    word_len = len(word)
    placed = False
    
    while not placed:
        if direction == 'horizontal':
            row = random.randint(0, rows - 1)
            col = random.randint(0, cols - word_len)
            if all(board[row][col + i] in ['', word[i]] for i in range(word_len)):
                for i in range(word_len):
                    board[row][col + i] = word[i]
                placed = True
        elif direction == 'vertical':
            row = random.randint(0, rows - word_len)
            col = random.randint(0, cols - 1)
            if all(board[row + i][col] in ['', word[i]] for i in range(word_len)):
                for i in range(word_len):
                    board[row + i][col] = word[i]
                placed = True
        elif direction == 'diagonal':
            row = random.randint(0, rows - word_len)
            col = random.randint(0, cols - word_len)
            if all(board[row + i][col + i] in ['', word[i]] for i in range(word_len)):
                for i in range(word_len):
                    board[row + i][col + i] = word[i]
                placed = True

# 정답 리스트의 단어들을 보드에 배치
for word in answers:
    place_word(board, word)

# 나머지 공간을 무작위 알파벳으로 채우기
for i in range(rows):
    for j in range(cols):
        if board[i][j] == '':
            board[i][j] = random.choice(alphabet)

# 보드 출력
for row in board:
    print(' '.join(row))
