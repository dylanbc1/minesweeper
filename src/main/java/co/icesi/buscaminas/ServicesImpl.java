package co.icesi.buscaminas;
import com.zeroc.Ice.Current;

import co.icesi.buscaminas.model.BoardGame;
import co.icesi.buscaminas.services.*;
public class ServicesImpl implements BoardSerices{
    private  BoardGame game;

    public ServicesImpl(){
        game = new BoardGame();
    }
    @Override
    public int initGame(int n, int m, int mines, Current current) {
        return game.initGame(n, m, mines);
    }

    @Override
    public boolean selectCell(int i, int j, Current current) {
        
        return game.selectCell(i, j);
    }

    @Override
    public void showAll(boolean show, Current current) {
        
        game.showAll(show);
    }

    @Override
    public Cell[][] printBoard(Current current) {
        game.printBoard();
        co.icesi.buscaminas.model.Cell [][] cells = game.getBoard();
        Cell[][] mapers = new Cell[cells.length][cells[0].length];
        for (int i = 0; i < cells.length; i++) {
            for (int j = 0; j < cells[0].length; j++) {
                mapers[i][j] = new Cell(cells[i][j].isLandMine(), cells[i][j].getValue(), cells[i][j].isHide(), cells[i][j].isShowAll());
            }
        }
        return mapers;
    }
    
}
